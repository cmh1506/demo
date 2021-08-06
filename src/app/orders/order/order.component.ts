
import { OrderService } from '../../shared/order.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { Customer } from 'src/app/shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import {CustomerService} from "../../shared/customer.service";
import { OrderItem } from 'src/app/shared/order-item.model';
import { Order } from 'src/app/shared/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  customerList!: Customer[];
  isValid: boolean = true;

  constructor(public service: OrderService,
              private dialog: MatDialog,
              private customerService: CustomerService,
              private toastr: ToastrService,
              private router: Router,
              private currentRoute: ActivatedRoute) {
  }

  ngOnInit() {
    let orderID = this.currentRoute.snapshot.paramMap.get('id');
    if (orderID == null)
      console.log("Hier fehlt was")
    else {
      this.service.getOrderByID(parseInt(orderID)).then((res: { order: Order; orderDetails: OrderItem[]; }) => {
        this.service.formData = res.order;
        this.service.orderItems = res.orderDetails;
      });
    }

    this.customerService.getCustomerList().then(res => this.customerList = res as Customer[]);
  }

  resetForm(form: NgForm) {
    if (form == null)
    // @ts-ignore
    this.service.formData = {
      orderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      customerID: 0,
      pMethod: '',
      gTotal: 0,
      deletedOrderItemIDs: ''
    };
    this.service.orderItems = [];
  }




  onDeleteOrderItem(orderItemID: number, i: number) {
    if (orderItemID != null)
      this.service.formData.deletedOrderItemIDs += orderItemID + ",";
    this.service.orderItems.splice(i, 1);
    this.updateGrandTotal();
  }

  updateGrandTotal() {
    this.service.formData.gTotal = this.service.orderItems.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0);
    this.service.formData.gTotal = parseFloat(this.service.formData.gTotal.toFixed(2));
  }

  validateForm() {
    this.isValid = true;
    if (this.service.formData.customerID == 0)
      this.isValid = false;
    else if (this.service.orderItems.length == 0)
      this.isValid = false;
    return this.isValid;
  }


  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.service.saveOrUpdateOrder().subscribe(res => {
        this.toastr.success('Submitted Successfully', 'Restaurent App.');
        this.router.navigate(['/orders']);
      })
    }
  }

}

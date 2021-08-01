import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student} from "../student";
import {StudentService} from "../student.service";
import {UserService} from "../user.service";
import {User} from "../user";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  student: Student;
  users!: User[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studenService: StudentService,
    public userService: UserService
  ) {
    this.student = new Student();
  }

  onSubmit(){
    this.studenService.save(this.student).subscribe(result => this.goToStudentList())
  }

  goToStudentList(){
    this.router.navigate(['/students']);
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe(result => this.users = result);
  }

}

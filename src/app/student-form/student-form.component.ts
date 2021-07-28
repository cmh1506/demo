import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student} from "../student";
import {StudentService} from "../student.service";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  student: Student;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studenService: StudentService
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
  }

}

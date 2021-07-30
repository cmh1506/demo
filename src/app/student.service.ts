import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Student} from './student';
import {Observable} from "rxjs";



@Injectable()
export class StudentService {

  private studentsUrl: string;

  constructor(private http: HttpClient) {
    this.studentsUrl = 'http://localhost:8090/students';
  }

  public findAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  public save(student: Student) {
    return this.http.post<Student>('http://localhost:8090/addstudent', student);
  }
}

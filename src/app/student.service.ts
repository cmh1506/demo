import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Student} from './student';
import {Observable} from "rxjs";
import { constants} from "./common/constants";


@Injectable()
export class StudentService {

  private studentsUrl: string;

  constructor(private http: HttpClient) {
    this.studentsUrl = constants.serverUrl + '/students';
  }

  public findAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  public save(student: Student) {
    return this.http.post<Student>(constants.serverUrl + '/addstudent', student);
  }
}

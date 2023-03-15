import { HttpClient } from '@angular/common/http';
import { employeeListMock } from './employees-list.mock';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  getAllEmployees() {
    return employeeListMock;
  }
}

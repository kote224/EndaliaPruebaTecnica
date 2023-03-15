import { HttpClient } from '@angular/common/http';
import { employeeListMock } from './employees-list.mock';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  //Aquí habría que crear un observable y a través del http client hacer la llamada necesaria. Se le pasaría el user y pass del formulario.
  getAllEmployees() {
    return employeeListMock;
  }
}

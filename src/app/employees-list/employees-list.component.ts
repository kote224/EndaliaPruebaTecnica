import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Employees } from '../models/Employees';
import { SessionService } from '../SessionService';
import { EmployeeService } from './employees-list.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent {
  public employeesList?: Array<Employees> = [];
  public empList: Employees[] = [];
  public empListFiltered: Employees[] = [];
  public employeesNameFiltered?: Array<string> = [];
  public searchText: string = '';
  public userRol: string = '';

  constructor(
    private employeeService: EmployeeService,
    public router: Router
  ) {}

  ngOnInit(): void {
    //Comprobamos que se ha iniciado sesion con el rol. Si no tiene, es que se esta intentando acceder de forma incorrecta y se le reenvia al login
    if (sessionStorage.getItem('rol') == null) this.router.navigate(['/']);
    else {
      //Cogemos el rol que devuelve la bd y comprobamos si es el necesario para ver la pagina
      this.userRol = sessionStorage.getItem('rol')!;
      if (this.userRol != 'admin') this.router.navigate(['Unauthorized']);
      else this.orderList();
    }
  }

  //Rellena la lista a mostrar en el html y se rellena la lista que va a ser filtrada sin machacar la otra
  orderList() {
    this.empList = this.employeeService.getAllEmployees().sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    this.empListFiltered = this.empList;
  }

  //Filtra por el texto que le pones en el buscador
  filterEmployees(): void {
    //Pone a minusculas el texto que le pasas
    const searchText = this.searchText.toLowerCase();
    //Filtra poniendo a comillas por si algun campo es vacio. Devuelve los resultados y los guarda en la lista que mostramos
    this.empListFiltered = this.empList.filter((employee) => {
      const name = employee.name?.toLowerCase() || '';
      const email = employee.mail?.toLowerCase() || '';
      const phone = employee.phone?.toLowerCase() || '';
      return (
        name.includes(searchText) ||
        email.includes(searchText) ||
        phone.includes(searchText)
      );
    });
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../header/header.component';

import { EmployeesListComponent } from './employees-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from '../SessionService';
import { EmployeeService } from './employees-list.service';

describe('EmployeesListComponent', () => {
  let component: EmployeesListComponent;
  let fixture: ComponentFixture<EmployeesListComponent>;
  let employeeService: EmployeeService;
  let sessionService: SessionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [EmployeeService, SessionService],
      declarations: [EmployeesListComponent, HeaderComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesListComponent);
    employeeService = TestBed.inject(EmployeeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort and set the employee list', () => {
    // Set up
    const mockEmployees = [
      { name: 'John Doe', charge: 'Manager', phone: '', mail: '', photo: '' },
      { name: 'John Doe', charge: 'Manager', phone: '', mail: '', photo: '' },
      { name: 'John Doe', charge: 'Manager', phone: '', mail: '', photo: '' },
    ];

    sessionStorage.setItem('rol', 'admin');
    console.log(sessionStorage.getItem('rol'));

    spyOn(employeeService, 'getAllEmployees').and.returnValue(mockEmployees);
    component.ngOnInit();

    // Assert
    expect(employeeService.getAllEmployees).toHaveBeenCalled();
    expect(component.empList).toEqual([
      { name: 'John Doe', charge: 'Manager', phone: '', mail: '', photo: '' },
      { name: 'John Doe', charge: 'Manager', phone: '', mail: '', photo: '' },
      { name: 'John Doe', charge: 'Manager', phone: '', mail: '', photo: '' },
    ]);
    expect(component.empListFiltered).toEqual(component.empList);
    sessionStorage.clear();
  });
});

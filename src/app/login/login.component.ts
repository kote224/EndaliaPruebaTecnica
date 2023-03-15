import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../models/Login';
import { SessionService } from '../SessionService';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean;

  public login?: Login = {
    id: '',
    name: '',
    clientRole: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    public loginService: LoginService,
    public router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    //Comprobamos si el formulario es válido para poder seguir adelante
    if (this.loginForm.invalid) {
      return;
    } else {
      this.login = this.loginService.getUserById(
        this.loginForm.value.username,
        this.loginForm.value.password
      );
      if (this.login.name === '') {
        this.invalidLogin = true;
      } else {
        this.sessionService.setItem('rol', this.login?.clientRole || '');
        this.router.navigate(['EmployeeList']);
      }
    }
  }
}

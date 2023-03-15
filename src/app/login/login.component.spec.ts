import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Route } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SessionService } from '../SessionService';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let loginService: LoginService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [LoginService, SessionService],
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    loginService = TestBed.inject(LoginService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a username input', () => {
    const usernameInput = fixture.nativeElement.querySelector('#username');
    expect(usernameInput).toBeDefined();
  });

  it('should have a required error message for the username input', () => {
    const usernameInput = component.loginForm.controls['username'];
    usernameInput.setValue('');
    usernameInput.markAsTouched();
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.invalid');
    expect(errorMessage.textContent).toContain('El campo nombre es requerido');
  });

  it('should have an email error message for the username input', () => {
    const usernameInput = component.loginForm.controls['username'];
    usernameInput.setValue('invalidemailformat');
    usernameInput.markAsTouched();
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.invalid');
    expect(errorMessage.textContent).toContain(
      'Por favor, introduce una dirección de correo electrónico válida'
    );
  });

  it('should not have any error messages for the username input when valid', () => {
    const usernameInput = component.loginForm.controls['username'];
    usernameInput.setValue('validemailformat@example.com');
    usernameInput.markAsTouched();
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.invalid');
    expect(errorMessage).toBeNull();
  });

  it('should have a password input', () => {
    const passwordInput = fixture.nativeElement.querySelector('#password');
    expect(passwordInput).toBeDefined();
  });

  it('should have a required error message for the password input', () => {
    const passwordInput = component.loginForm.controls['password'];
    passwordInput.setValue('');
    passwordInput.markAsTouched();
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.invalid');
    expect(errorMessage.textContent).toContain(
      'El campo password es requerido'
    );
  });

  it('should set invalidLogin to true if login name is empty', () => {
    spyOn(loginService, 'getUserById')
      .withArgs('admin@admin.com', 'admin')
      .and.returnValue({
        id: '',
        name: 'admin',
        clientRole: 'admin',
      });
    spyOn(component.router, 'navigate');

    // Configurar el valor de los controles del formulario
    component.loginForm.controls['username'].setValue('admin@admin.com');
    component.loginForm.controls['password'].setValue('admin');

    // Actualizar el estado de validación del formulario
    component.loginForm.controls['username'].markAsTouched();
    component.loginForm.controls['password'].markAsTouched();

    component.onSubmit();

    expect(loginService.getUserById).toHaveBeenCalledWith(
      'admin@admin.com',
      'admin'
    );
  });
});

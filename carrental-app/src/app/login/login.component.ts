import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { LoginDTO } from '../../../models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private toastr: ToastrService) { }

  formBuilder = inject(FormBuilder);
  userService = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router);

  isRegisterMode = false;

  loginForm = this.formBuilder.group<LoginDTO>({
    email: '', 
    password: '',
    password2: ''
  });

  login() {
    const loginData = this.loginForm.value as LoginDTO;

    this.userService.login(loginData).subscribe({
      next: (response) => {
        this.authService.setToken(response.accessToken);
        this.toastr.success('Sikeres belépés!', 'Siker', { timeOut: 3000 })
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.toastr.error(err.error.error, 'Hiba!');
      }
    });
  }

  changeToRegister() {
    this.isRegisterMode = true;
  }
  changeToLogin() {
    this.isRegisterMode = false;
  }

  register() {
    if (this.loginForm.valid && this.loginForm.value.password2 != '') {

      const loginData = this.loginForm.value as LoginDTO;

      if (loginData.password == loginData.password2) {


        this.userService.register(loginData).subscribe({
          error: () => {this.toastr.error('A felhasználó létrehozása sikertelen!', 'Hiba!', {timeOut: 3000});},
          next: () => {
            this.loginForm.setValue({
              email: '',
              password: '',
              password2: ''
            });
            this.toastr.success('Sikeres regisztráció!', 'Siker!', { timeOut: 1000 });
            this.changeToLogin();
          } 
        })


      } else {
        this.toastr.warning('A jelszavak nem egyeznek!', 'Figyelem!', { timeOut: 3000 })
      }


    } else {

      this.toastr.warning('Legalább egy adat hiányzik a regisztrációhoz!', 'Figyelem!', { timeOut: 3000 })
    }

  }
}
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'carrental-app';

  authService = inject(AuthService);
  router = inject(Router);
  constructor(private toastr: ToastrService){}

  logout(){
    this.authService.removeToken();
    this.router.navigateByUrl('/');
    this.toastr.success('Sikeres kijelentkezés!', 'Kijelentkezés', {timeOut: 5000});
  }
}

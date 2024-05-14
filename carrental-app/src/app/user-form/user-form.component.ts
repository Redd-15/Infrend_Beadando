import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDTO } from '../../../models';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  formBuilder = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  userForm = this.formBuilder.group<UserDTO>({
    id: 0,
    customerId: '',
    name: '',
    address: '',
    phone: '',
    idCard: '',
    driversLicense: ''
  });

  isNewUser = true;

  ngOnInit(): void {

    this.userForm.get('customerId')?.addValidators(Validators.required);
    this.userForm.get('name')?.addValidators(Validators.required);
    this.userForm.get('address')?.addValidators(Validators.required);
    this.userForm.get('phone')?.addValidators(Validators.required);
    this.userForm.get('idCard')?.addValidators(Validators.required);
    this.userForm.get('driversLicense')?.addValidators(Validators.required);

    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNewUser = false;
      this.userService.getOne(id).subscribe({

        next: (user) => { this.userForm.setValue(user) },
        error: (err) => {
          this.toastr.error("No such user found! ID: " + id, 'Error!');
          console.error(err);
        }
      })
    }

  }

  saveUser() {

    if (this.userForm.valid) {



      const user = this.userForm.value as UserDTO;

      if (this.isNewUser) {


        this.userService.create(user).subscribe({

          next: () => {
            this.toastr.success('Új felhasználó sikeresen hozzáadva!', 'Siker!', { timeOut: 3000, });
            this.router.navigateByUrl('/');

          },

          error: (err) => {
            this.toastr.error('Hiba történt a felhasználó hozzáadása közben!', 'Hiba!');
            console.error(err);
          }

        });

      } else {

        this.userService.update(user).subscribe({

          next: () => {
            this.toastr.success('Felhasználó sikeresen frissítve! id: ' + user.id, 'Siker!', { timeOut: 3000, });
            this.router.navigateByUrl('/');

          },

          error: (err) => {
            this.toastr.error('Hiba történt a felhasználó frissítése közben!', 'Hiba!');
            console.error(err);
          }

        });
      }
    }
    else{
      this.toastr.warning('Legalább egy mező hiányzik az oldalon!', 'Hiányzó mező!');
    }
  }

}


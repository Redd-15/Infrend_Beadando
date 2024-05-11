import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
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

  toastr: ToastrService;
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
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNewUser = false;
      this.userService.getOne(id).subscribe({

        next: (user) => this.userForm.setValue(user),
        error: (err) => {
          //this.toastr.error(err, 'Error!', {timeOut: 3000,});
          console.error(err);
        }
      })
    }

  }

  saveUser() {
    const user = this.userForm.value as UserDTO;

    if (this.isNewUser) {


      this.userService.create(user).subscribe({

        next: () => {
          //this.toastr.success('Succesfully added new user!', 'Success!', {timeOut: 3000,});
          this.router.navigateByUrl('/');

        },

        error: (err) => {
          //this.toastr.error(err, 'Error!', {timeOut: 3000,});
          console.error(err);
        }

      });

    } else {

      this.userService.update(user).subscribe({

        next: () => {
          //this.toastr.success('Succesfully added new vehicle!', 'Success!', {timeOut: 3000,});
          this.router.navigateByUrl('/');

        },

        error: (err) => {
          //this.toastr.error(err, 'Error!', {timeOut: 3000,});
          console.error(err);
        }

      });
    }
  }

}


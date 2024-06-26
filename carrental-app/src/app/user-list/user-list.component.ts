import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserDTO } from '../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  constructor(private toastr: ToastrService) {}

  userService = inject(UserService);
  authService = inject(AuthService);
  users: UserDTO[] = [];
  router = inject(Router);

  ngOnInit(): void {
      this.userService.getAll().subscribe({
        next: users => this.users = users,
        error: err => console.error(err)
      });

  }

  goToUserForm(id: number) {
    
    this.router.navigate([ '/edit-user', id]);
  }

  goToRentForm(id: number){
    this.router.navigate([ 'rent-start/user/', id]);
  }

  deleteUser(user: UserDTO) {
    
    this.userService.delete(user.id).subscribe({

      next: () => {
        const index = this.users.indexOf(user);
        if (index > -1){
          this.users.splice(index, 1);
        }
        this.toastr.success('Felhasználó sikeresen törölve! id:' + index, 'Siker!', {timeOut: 3000,});
      },
      error : (err) =>{
        this.toastr.error('Hiba történt a felhasználó törése közben! id:' + user.id, 'Hiba!');
        console.error(err);
      }


    });
    }

}

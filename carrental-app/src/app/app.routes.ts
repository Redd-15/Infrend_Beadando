import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
    {
        path: '',
        component : UserListComponent
    },
    {
        path: 'add-user',
        component : UserFormComponent
    },
    {
        path: 'edit-user/:id',
        component : UserFormComponent
    }
];

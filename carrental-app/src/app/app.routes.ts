import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';

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
    },
    {
        path: 'vehicles',
        component : VehicleListComponent
    },
    {
        path: 'add-vehicle',
        component : VehicleFormComponent
    },
    {
        path: 'edit-vehicle/:id',
        component : VehicleFormComponent
    }
];

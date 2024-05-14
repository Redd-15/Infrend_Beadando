import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { RentStartFormComponent } from './rent-start-form/rent-start-form.component';
import { RentEndFormComponent } from './rent-end-form/rent-end-form.component';
import { RentListComponent } from './rent-list/rent-list.component';
import { RentEditComponent } from './rent-edit/rent-edit.component';

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
    },
    {
        path: 'rent-start/user/:user',
        component : RentStartFormComponent
    },
    {
        path: 'rent-start/vehicle/:vehicle',
        component : RentStartFormComponent
    },
    {
        path: 'rent-list',
        component : RentListComponent
    },
    {
        path: 'rent-end/:id',
        component : RentEndFormComponent
    },
    {
        path: 'rent-edit/:id',
        component : RentEditComponent
    },
];

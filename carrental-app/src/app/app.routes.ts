import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { RentStartFormComponent } from './rent-start-form/rent-start-form.component';
import { RentEndFormComponent } from './rent-end-form/rent-end-form.component';
import { RentListComponent } from './rent-list/rent-list.component';
import { RentEditComponent } from './rent-edit/rent-edit.component';
import { LoginComponent } from './login/login.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
    {
        path: '',
        component : UserListComponent,
    },
    {
        path: 'add-user',
        component : UserFormComponent,
        canActivate: [ () => inject(AuthService).preventGuestAccess()]
    },
    {
        path: 'edit-user/:id',
        component : UserFormComponent,
        canActivate: [ () => inject(AuthService).preventGuestAccess()]
    },
    {
        path: 'vehicles',
        component : VehicleListComponent
    },
    {
        path: 'add-vehicle',
        component : VehicleFormComponent,
        canActivate: [ () => inject(AuthService).preventGuestAccess()]
    },
    {
        path: 'edit-vehicle/:id',
        component : VehicleFormComponent,
        canActivate: [ () => inject(AuthService).preventGuestAccess()]
    },
    {
        path: 'rent-start/user/:user',
        component : RentStartFormComponent,
        canActivate: [ () => inject(AuthService).preventGuestAccess()]
    },
    {
        path: 'rent-start/vehicle/:vehicle',
        component : RentStartFormComponent,
        canActivate: [ () => inject(AuthService).preventGuestAccess()]
    },
    {
        path: 'rent-list',
        component : RentListComponent
    },
    {
        path: 'rent-end/:id',
        component : RentEndFormComponent,
        canActivate: [ () => inject(AuthService).preventGuestAccess()]
    },
    {
        path: 'rent-edit/:id',
        component : RentEditComponent,
        canActivate: [ () => inject(AuthService).preventGuestAccess()]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

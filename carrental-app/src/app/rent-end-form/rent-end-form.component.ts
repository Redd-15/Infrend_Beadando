import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { VehicleService } from '../services/vehicle.service';
import { RentService } from '../services/rent.service';
import { RentDTO, UserDTO, VehicleDTO } from '../../../models';
import { rentState } from '../../../server/src/entity/Rent';
import { CommonModule } from '@angular/common';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-rent-end-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DateTimePickerModule],
  templateUrl: './rent-end-form.component.html',
  styleUrl: './rent-end-form.component.css'
})
export class RentEndFormComponent {

  constructor(private toastr: ToastrService) { }

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  formBuilder = inject(FormBuilder);

  userService = inject(UserService);
  vehicleService = inject(VehicleService);
  rentService = inject(RentService);

  preselectedUser: UserDTO | null = null;
  preselectedVehicle: VehicleDTO | null = null;
  users: UserDTO[] = [];
  vehicles: VehicleDTO[] = [];

  rentForm = this.formBuilder.group<RentDTO>({
    id: 0,
    calculatedPrice: 0,
    state: rentState.BOOKED,
    timestampFrom: '',
    timestampTo: '',
    renting: null,
    vehicle: null
  });

  ngOnInit(): void {

    this.userService.getAll().subscribe(users => this.users = users);
    this.vehicleService.getAll().subscribe(vehicles => this.vehicles = vehicles);

    const id = this.activatedRoute.snapshot.params['id'];

    this.rentService.getById(id).subscribe({
      error: () => {this.toastr.error('Hiba történt a bérlés lekérdezése közben!', 'Hiba!');},
      next: (rent) => {
        console.log(rent);
        this.rentForm.setValue(rent);
      }
    });

    this.rentForm.get('id')?.addValidators(Validators.required);
    this.rentForm.get('calculatedPrice')?.addValidators(Validators.required);
    this.rentForm.get('state')?.addValidators(Validators.required);
    this.rentForm.get('timestampFrom')?.addValidators(Validators.required);
    this.rentForm.get('timestampTo')?.addValidators(Validators.required);
    this.rentForm.get('renting')?.addValidators(Validators.required);
    this.rentForm.get('vehicle')?.addValidators(Validators.required);

  }

  updateRent() {
    if (this.rentForm.valid) {

      this.rentService.update(this.rentForm.value as RentDTO).subscribe({

        error: () => {this.toastr.error('Hiba történt a bérlés frissítése közben!', 'Hiba!');},
        next: () => {
          this.rentService.update(this.rentForm.value as RentDTO);
          this.toastr.success('Foglalás sikeresen frissítve','Siker!',{timeOut: 3000});
          this.router.navigateByUrl('/rent-list');
        }

      })

    }
    else {
      this.toastr.warning('Legalább egy mező hiányzik az oldalon!', 'Hiányzó mező!');
    }
  }

}

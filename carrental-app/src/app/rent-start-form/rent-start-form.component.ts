import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RentService } from '../services/rent.service';
import { RentDTO, UserDTO, VehicleDTO } from '../../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { rentState } from '../../../server/src/entity/Rent';
import { VehicleService } from '../services/vehicle.service';
import { UserService } from '../services/user.service';
import { vehicleStatus, vehicleType } from '../../../server/src/entity/Vehicle';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-rent-start-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DateTimePickerModule],
  templateUrl: './rent-start-form.component.html',
  styleUrl: './rent-start-form.component.css'
})

export class RentStartFormComponent implements OnInit {

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

    this.rentForm.get('timestampFrom')?.addValidators(Validators.required);
    this.rentForm.get('timestampTo')?.addValidators(Validators.required);
    this.rentForm.get('renting')?.addValidators(Validators.required);
    this.rentForm.get('vehicle')?.addValidators(Validators.required);

    this.userService.getAll().subscribe(users => this.users = users);
    this.vehicleService.getByStatusV(vehicleStatus.FREE, vehicleType.EITHER).subscribe(vehicles => this.vehicles = vehicles);

    const preselectedUserId: number = this.activatedRoute.snapshot.params['user'];
    const preselectedVehicleId: number = this.activatedRoute.snapshot.params['vehicle'];

    if (preselectedUserId) {

      this.userService.getOne(preselectedUserId as number).subscribe({
        next: (user) => { this.preselectedUser = user; this.rentForm.patchValue({ renting: this.preselectedUser }); },
        error: () => this.toastr.warning('Megadott felhasználó nem található! id: ' + preselectedUserId, "Vigyázat!")
      });
    }

    if (preselectedVehicleId) {

      this.vehicleService.getOneById(preselectedVehicleId as number).subscribe({
        next: (vehicle) => {
          this.preselectedVehicle = vehicle;
          if (this.preselectedVehicle.status != vehicleStatus.FREE) {
            this.toastr.warning('A megadott járművet nem lehet kibérelni! id: ' + preselectedVehicleId, "Figyelem!")
          }
          else {
            this.rentForm.patchValue({ vehicle: this.preselectedVehicle });
          }
        },
        error: () => this.toastr.warning('A megadott jármű nem található! id: ' + preselectedVehicleId, "Vigyázat!")
      });
    }
  }


  arrangeRent() {
    if (this.rentForm.valid) {

      const datetimeFrom = Date.parse(this.rentForm.value.timestampFrom as string);
      const datetimeTo = Date.parse(this.rentForm.value.timestampTo as string);

      this.rentForm.value.timestampFrom = (new Date(datetimeFrom)).toString();
      this.rentForm.value.timestampTo = (new Date(datetimeTo)).toString();

      var days = Math.ceil((datetimeTo - datetimeFrom) / (1000 * 60 * 60 * 24));

      this.vehicleService.getOneById(this.rentForm.value.vehicle?.id as number).subscribe({

        error: () => this.toastr.error('Hiba történt a foglalás költségének számítása közben!', 'Hiba!'),
        next: (exactVehicle) => {

          this.rentForm.value.calculatedPrice = days * exactVehicle.pricePerDay;

          const rent = this.rentForm.value as RentDTO;

          this.rentService.create(rent).subscribe({
            error: () => { this.toastr.error('Hiba történt a foglalás mentése közben!', 'Hiba!'); },
            next: () => {
              this.toastr.success('Új foglalás sikeresen hozzáadva!', 'Siker!', { timeOut: 3000 });
              exactVehicle.status = vehicleStatus.RENTED;

              this.vehicleService.update(exactVehicle).subscribe({
                error: (err) => this.toastr.error('Hiba történt az autó állapotána frissítése közben!', 'Hiba!'),
                next: () => {
                  this.toastr.success('Autó állapota sikeresen frissítve!', 'Siker!', { timeOut: 3000 });
                  this.router.navigateByUrl('/rent-list');
                }
              });
            }

          });

        }

      })


    }
    else {
      this.toastr.warning('Legalább egy mező hiányzik az oldalon!', 'Hiányzó mező!');
    }
  }

}


import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleDTO } from '../../../models';
import { VehicleService } from '../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { vehicleStatus, vehicleType } from '../../../server/src/entity/Vehicle';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.css'
})
export class VehicleFormComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  formBuilder = inject(FormBuilder);
  vehicleService = inject(VehicleService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  vehicleForm = this.formBuilder.group<VehicleDTO>({
    id: 0,
    brand: '',
    type: '',
    licensePlate: '',
    vin: '',
    pricePerDay: 0,
    odometer: 0,
    status: vehicleStatus.FREE,
    vehicleType: vehicleType.CAR
  });


  isNewVehicle = true;


  ngOnInit(): void {

    this.vehicleForm.get('brand')?.addValidators(Validators.required);
    this.vehicleForm.get('type')?.addValidators(Validators.required);
    this.vehicleForm.get('licensePlate')?.addValidators(Validators.required);
    this.vehicleForm.get('vin')?.addValidators(Validators.required);
    this.vehicleForm.get('pricePerDay')?.addValidators([Validators.required, Validators.min(1000)]);
    this.vehicleForm.get('odometer')?.addValidators(Validators.required);


    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNewVehicle = false;
      this.vehicleService.getOneById(id).subscribe({

        next: (vehicle) => this.vehicleForm.setValue(vehicle),
        error: (err) => {
          this.toastr.error("Jármű nem található! id: " + id, 'Hiba!');
          console.error(err);
        }
      })
    }

  }

  saveVehicle() {

    if (this.vehicleForm.valid) {


      const vehicle = this.vehicleForm.value as VehicleDTO;

      if (this.isNewVehicle) {


        this.vehicleService.create(vehicle).subscribe({

          next: () => {
            this.toastr.success('Új jármű sikeresen hozzáadva!', 'Siker!', { timeOut: 3000, });
            this.router.navigateByUrl('/vehicles');

          },

          error: (err) => {
            this.toastr.error('Hiba történt a jármű létrehozása közben!', 'Hiba!', { timeOut: 3000, });
            console.error(err);
          }

        });

      } else {

        this.vehicleService.update(vehicle).subscribe({

          next: () => {
            this.toastr.success('Jármű sikeresen frissítve! id: ' + vehicle.id, 'Siker!', { timeOut: 3000, });
            this.router.navigateByUrl('/vehicles');

          },

          error: (err) => {
            this.toastr.error('Hiba történt a jármű frissítése közben!', 'Hiba!', { timeOut: 3000, });
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


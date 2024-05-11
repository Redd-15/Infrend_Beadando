import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { VehicleDTO } from '../../../models';
import { VehicleService } from '../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleStatus2LabelMapping, VehicleType2LabelMapping, vehicleStatus, vehicleType } from '../../../server/src/entity/Vehicle';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.css'
})
export class VehicleFormComponent implements OnInit {

  
  public VehicleType2LabelMapping = VehicleType2LabelMapping;
  public VehicleStatus2LabelMapping = VehicleStatus2LabelMapping;

  public vehicleTypes = Object.values(vehicleType);
  public vehicleStatuses = Object.values(vehicleStatus).filter(value => typeof value === 'number');;
  
  toastr: ToastrService;
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
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNewVehicle = false;
      this.vehicleService.getOneById(id).subscribe({

        next: (vehicle) => this.vehicleForm.setValue(vehicle),
        error: (err) => {
          this.toastr.error("No such vehicle found! ID: " + id);
          console.error(err);
        }
      })
    }

  }

  saveVehicle() {
    const vehicle = this.vehicleForm.value as VehicleDTO;

    if (this.isNewVehicle) {


      this.vehicleService.create(vehicle).subscribe({

        next: () => {
          //this.toastr.show('Succesfully added new vehicle!', 'Success!', {timeOut: 3000,});
          this.router.navigateByUrl('/vehicles');

        },

        error: (err) => {
          //this.toastr.error(err, 'Error!', {timeOut: 3000,});
          console.error(err);    
        }

      });

    } else {

      this.vehicleService.update(vehicle).subscribe({

        next: () => {
          //this.toastr.success('Succesfully added new vehicle!', 'Success!', {timeOut: 3000,});
          this.router.navigateByUrl('/vehicles');

        },

        error: (err) => {
          //this.toastr.error(err, 'Error!', {timeOut: 3000,});
          console.error(err);
        }

      });
    }
  }

}


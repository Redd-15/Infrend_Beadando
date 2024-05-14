import { Component, OnInit, inject } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { VehicleDTO } from '../../../models';
import { Router } from '@angular/router';
import { vehicleStatus, vehicleType } from '../../../server/src/entity/Vehicle';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


export interface SearchDTO{

  id: number;
  type: string;
  licensePlate: '';
  status: vehicleStatus;
  vehicleType: vehicleType;
}

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})

export class VehicleListComponent implements OnInit {

  constructor(private toastr: ToastrService) {}

  formBuilder = inject(FormBuilder)
  vehicleService = inject(VehicleService);
  vehicles: VehicleDTO[] = [];
  router = inject(Router);

  searchForm = this.formBuilder.group<SearchDTO>({
    id: 0,
    type: '',
    licensePlate: '',
    status: vehicleStatus.EITHER,
    vehicleType: vehicleType.EITHER
  });

  ngOnInit(): void {
      this.vehicleService.getAll().subscribe({
        next: vehicles => this.vehicles = vehicles,
        error: err => console.error(err)
      });

  }

  goToVehicleForm(id: number) {
    
    this.router.navigate([ '/edit-vehicle', id]);
  }

  goToRentForm(id: number) {
    
    this.router.navigate([ '/rent-start/vehicle', id]);
  }

  deleteVehicle(vehicle: VehicleDTO) {
    
    this.vehicleService.delete(vehicle.id).subscribe({

      next: () => {
        const index = this.vehicles.indexOf(vehicle);
        if (index > -1){
          this.vehicles.splice(index, 1);
        }
        this.toastr.success('Jármű sikeresen törölve! id:' + index, 'Siker!', {timeOut: 3000,});
      },
      error : (err) =>{
        this.toastr.error('Hiba történt a jármű törlése közben! id:' + vehicle.id, "Hiba!");
      }


    });
    }

  search(){

    const search = this.searchForm.value as SearchDTO

    if(search.id != 0){
      this.vehicleService.getOneById(search.id).subscribe({
        next: vehicles => {
          this.vehicles = [];
          this.vehicles[0] = vehicles
        },
        error: err => {
          console.error(err);
          this.toastr.error("Jármű nem található! id:" + search.id, "Hiba!");
        }
      });
    }
    else if(search.type != ''){
      this.vehicleService.getByTypeSV(search.type, search.status, search.vehicleType).subscribe({
        next: vehicles => {
          this.vehicles = vehicles;
        },
        error: err => {
          console.error(err);
          this.toastr.error("Jármű nem található!", "Hiba!");
        }
      });
    }
    else if (search.licensePlate != ''){
      this.vehicleService.getByLicensePlateSV(search.licensePlate, search.status, search.vehicleType).subscribe({
        next: vehicles => {
          this.vehicles = vehicles
        },
        error: err => {
          console.error(err);
          this.toastr.error("Jármű nem található!", "Hiba!");
        }
      });
    }
    else if(search.status != vehicleStatus.EITHER){
      this.vehicleService.getByStatusV(search.status, search.vehicleType).subscribe({
        next: vehicles => {
          this.vehicles = vehicles
        },
        error: err => {
          console.error(err);
          this.toastr.error("Jármű nem található!", "Hiba!");
        }
      });
    }
    else{
      this.vehicleService.getAll().subscribe({
        next: vehicles => this.vehicles = vehicles,
        error: err => {
          console.error(err);
          this.toastr.error("Hiba történt a szerverhez való csatlakozás folyamán!", "Hiba!");
        }
      });

    }
  }

  resetSearch(){

    this.searchForm.setValue({
      id: 0,
      type: '',
      licensePlate: '',
      status: vehicleStatus.EITHER,
      vehicleType: vehicleType.EITHER
    });

    this.vehicleService.getAll().subscribe({
      next: vehicles => this.vehicles = vehicles,
      error: err => {
        console.error(err);
        this.toastr.error("Error connecting to server!", "Hiba!");
      }
    });
  }

}

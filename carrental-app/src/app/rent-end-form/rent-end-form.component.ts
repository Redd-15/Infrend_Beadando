import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from '../services/vehicle.service';
import { RentService } from '../services/rent.service';
import { RentDTO, UserDTO, VehicleDTO, endCalculationDTO } from '../../../models';
import { rentState } from '../../../server/src/entity/Rent';
import { CommonModule } from '@angular/common';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { vehicleStatus } from '../../../server/src/entity/Vehicle';



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
  vehicleService = inject(VehicleService);
  rentService = inject(RentService);

  preselectedUser: UserDTO | null = null;
  preselectedVehicle: VehicleDTO | null = null;
  users: UserDTO[] = [];
  vehicles: VehicleDTO[] = [];

  prevOdometer = 0;
  calculationForm = this.formBuilder.group<endCalculationDTO>({

    newOdometer: 0,
    distanceMoney: 0,
    crashMoney: 0
  });

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

    const id = this.activatedRoute.snapshot.params['id'];

    this.rentService.getById(id).subscribe({
      error: () => { this.toastr.error('Hiba történt a bérlés lekérdezése közben!', 'Hiba!'); },
      next: (rent) => {
        this.rentForm.setValue(rent);

        this.calculationForm.patchValue({
          newOdometer: rent.vehicle?.odometer
        })
        this.prevOdometer = rent.vehicle?.odometer as number;
      }
    });

    this.rentForm.get('id')?.addValidators(Validators.required);
    this.rentForm.get('calculatedPrice')?.addValidators(Validators.required);
    this.rentForm.get('state')?.addValidators(Validators.required);
    this.rentForm.get('timestampFrom')?.addValidators(Validators.required);
    this.rentForm.get('timestampTo')?.addValidators(Validators.required);
    this.rentForm.get('renting')?.addValidators(Validators.required);
    this.rentForm.get('vehicle')?.addValidators(Validators.required);



    this.calculationForm.get('distanceMoney')?.addValidators([Validators.required, Validators.min(1)]);
    this.calculationForm.get('newOdometer')?.addValidators([Validators.required, Validators.min(this.prevOdometer)]);
    this.calculationForm.get('crashMoneyy')?.addValidators(Validators.min(0));


  }

  calculateRent() {

    if (this.calculationForm.valid) {
      const datetimeFrom = Date.parse(this.rentForm.value.timestampFrom as string);
      const datetimeTo = Date.parse(this.rentForm.value.timestampTo as string);

      this.rentForm.value.timestampFrom = (new Date(datetimeFrom)).toString();
      this.rentForm.value.timestampTo = (new Date(datetimeTo)).toString();

      var days = Math.ceil((datetimeTo - datetimeFrom) / (1000 * 60 * 60 * 24));

      this.vehicleService.getOneById(this.rentForm.value.vehicle?.id as number).subscribe({

        error: () => {
          this.toastr.error('Hiba történt a bérlés költségeinek számítása közben!', 'Hiba!');
          throw new Error();
        },
        next: (exactVehicle) => {
          this.rentForm.value.calculatedPrice = (days * exactVehicle.pricePerDay);
          this.rentForm.value.calculatedPrice += ((this.calculationForm.value.newOdometer as number - this.prevOdometer) * (this.calculationForm.value.distanceMoney as number));
          this.rentForm.value.calculatedPrice += this.calculationForm.value.crashMoney as number;


        }

      });
    }
    else{
      this.toastr.warning('Legalább egy mező helytelen az oldalon!', 'Hiányzó mező!');
    }
  }

  closeRent() {

    if (this.rentForm.valid && this.calculationForm.valid) {


      try{
        this.calculateRent();
      }
      catch(e){

        return;
      }

      this.rentForm.patchValue({state: rentState.TO_BE_PAID});

      this.rentService.update(this.rentForm.value as RentDTO).subscribe({
        error: () => { this.toastr.error('Hiba történt a bérlés frissítése közben!', 'Hiba!'); },
        next: () => {
          this.toastr.success('Foglalás sikeresen frissítve', 'Siker!', { timeOut: 3000 });
        }
      });


      var vehicleNewState = this.rentForm.value.vehicle as VehicleDTO;

      vehicleNewState.odometer = this.calculationForm.value.newOdometer as number;

      if (this.calculationForm.value.crashMoney as number > 0){
        vehicleNewState.status = vehicleStatus.OUTOFORDER;
      }
      else{
        vehicleNewState.status = vehicleStatus.FREE;
      }

      this.vehicleService.update(vehicleNewState).subscribe({
        error: () => { this.toastr.error('Hiba történt a jármű állapotának frissítése közben!', 'Hiba!'); },
        next: () => {
          this.toastr.success('Jármű állapota sikeresen frissítve', 'Siker!', { timeOut: 3000 });
          this.router.navigateByUrl('/rent-list');
        }
      });
      

    }
    else {
      this.toastr.warning('Legalább egy mező helytelen az oldalon!', 'Hiányzó mező!');
    }
  }

}

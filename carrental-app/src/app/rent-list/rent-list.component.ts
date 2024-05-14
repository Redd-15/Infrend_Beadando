import { Component, OnInit, inject } from '@angular/core';
import { rentState } from '../../../server/src/entity/Rent';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RentDTO } from '../../../models';
import { RentService } from '../services/rent.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface SearchDTO {

  status: rentState;
}

@Component({
  selector: 'app-rent-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './rent-list.component.html',
  styleUrl: './rent-list.component.css'
})

export class RentListComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  formBuilder = inject(FormBuilder)
  rentService = inject(RentService);
  rents: RentDTO[] = [];
  router = inject(Router);

  searchForm = this.formBuilder.group<SearchDTO>({
    status: rentState.EITHER
  });

  ngOnInit(): void {
    this.rentService.getAll().subscribe({
      next: rents => {
        this.rents = rents

        rents.forEach(rent => {
          rent.timestampFrom = new Date(Date.parse(rent.timestampFrom as string) - (1000 * 60 * 60 * 2)).toISOString();
          rent.timestampTo = new Date(Date.parse(rent.timestampTo as string) - (1000 * 60 * 60 * 2)).toISOString();
        });

      },
      error: err => console.error(err)
    });
  }


  deleteRent(rent: RentDTO) {

    this.rentService.delete(rent.id).subscribe({

      next: () => {
        const index = this.rents.indexOf(rent);
        if (index > -1) {
          this.rents.splice(index, 1);
        }
        this.toastr.success('Jármű törölve! id:' + index, 'Siker!', { timeOut: 3000, });
      },
      error: (err) => {
        this.toastr.error('Nem lehet a járművet törölni! id:' + rent.id, "Hiba!");
      }
    });
  }
  modifyRent(id: number) {
    this.router.navigate(['/rent-edit', id]);
  }
  closeRent(arg0: any) {
    throw new Error('Method not implemented.');
  }

  search() {
    if (this.searchForm.value.status != rentState.EITHER) {
      this.rentService.getByStatus(this.searchForm.value.status as rentState).subscribe({

        error: () => { this.toastr.error('Nincs ilyen bérlés!', 'Hiba!'); },
        next: (searchRents) => {
          this.rents = searchRents;
        }
      });
    }
    else {
      this.toastr.warning('Nincs kiválasztott állapot!', "Hiba!");
    }
  }
  resetSearch() {
    this.rentService.getAll().subscribe({

      error: () => { this.toastr.error('Hiba az adatbázis elérésével!', 'Hiba!'); },
      next: (allRents) => {
        this.rents = allRents;
      }
    });
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RentDTO } from '../../../models';
import { rentState } from '../../../server/src/entity/Rent';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<RentDTO[]>('/api/rents');    
  }
  create(rent: RentDTO) {
    return this.http.post<RentDTO>('/api/rent', rent);
  }

  getById(id: number){
    return this.http.get<RentDTO>('/api/rent/id/' + id);
  }

  getByStatus(rentstate: rentState){
    return this.http.get<RentDTO[]>('/api/rent/state/' + rentstate);
  }

  update(rent: RentDTO) {
    return this.http.put<RentDTO>('/api/rent', rent);
  }

  delete(id: number) {
    return this.http.delete('/api/rent/' + id); 
  }
}

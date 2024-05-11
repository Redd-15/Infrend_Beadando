import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { VehicleDTO } from '../../../models';
import { vehicleStatus, vehicleType } from '../../../server/src/entity/Vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<VehicleDTO[]>('/api/vehicles');    
  }

  getOneById(id: number) {
    return this.http.get<VehicleDTO>('/api/vehicle/id/' + id);    
  }

  getOneByType(type: string) {
    return this.http.get<VehicleDTO>('/api/vehicle/id/' + type);    
  }
  
  getOneByStatus(status: vehicleStatus) {
    return this.http.get<VehicleDTO>('/api/vehicle/id/' + status);    
  }

  getOneByVType(vtype: vehicleType) {
    return this.http.get<VehicleDTO>('/api/vehicle/id/' + vtype);    
  }

  create(user: VehicleDTO) {
    return this.http.post<VehicleDTO>('/api/user', user);
  }

  update(user: VehicleDTO) {
    return this.http.put<VehicleDTO>('/api/user', user);
  }

  delete(id: number) {
    return this.http.delete('/api/user/' + id); 
  }
}

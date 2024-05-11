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

  getByType(type: string) {
    return this.http.get<VehicleDTO[]>('/api/vehicle/type/' + type);    
  }
  
  getByStatus(status: vehicleStatus) {
    return this.http.get<VehicleDTO[]>('/api/vehicle/status/' + status);    
  }

  getByVType(vtype: vehicleType) {
    return this.http.get<VehicleDTO[]>('/api/vehicle/vtype/' + vtype);    
  }

  create(user: VehicleDTO) {
    return this.http.post<VehicleDTO>('/api/vehicle', user);
  }

  update(user: VehicleDTO) {
    return this.http.put<VehicleDTO>('/api/vehicle', user);
  }

  delete(id: number) {
    return this.http.delete('/api/vehicle/' + id); 
  }
}

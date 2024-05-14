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

  getByStatusV(status: vehicleStatus, vtype: vehicleType) {
    return this.http.get<VehicleDTO[]>('/api/vehicle/status/' + status+ '&' + vtype);    
  }

  getByTypeSV(type: string, status:vehicleStatus, vtype: vehicleType) {
    return this.http.get<VehicleDTO[]>('/api/vehicle/type/'+ type + '&' + status+ '&' + vtype);    
  }

  getByLicensePlateSV(lPlate: string, status:vehicleStatus, vtype: vehicleType) {
    return this.http.get<VehicleDTO[]>('/api/vehicle/lplate/' + lPlate + '&' + status + '&' + vtype);    
  }

  getByVType(vtype: vehicleType) {
    return this.http.get<VehicleDTO[]>('/api/vehicle/vtype/' + vtype);    
  }

  create(vehicle: VehicleDTO) {
    return this.http.post<VehicleDTO>('/api/vehicle', vehicle);
  }

  update(vehicle: VehicleDTO) {
    return this.http.put<VehicleDTO>('/api/vehicle', vehicle);
  }

  delete(id: number) {
    return this.http.delete('/api/vehicle/' + id); 
  }
}

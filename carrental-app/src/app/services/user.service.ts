import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AccessTokenDTO, LoginDTO, UserDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<UserDTO[]>('/api/users');
  }

  getOne(id: number) {
    return this.http.get<UserDTO>('/api/user/' + id);
  }

  create(user: UserDTO) {
    return this.http.post<UserDTO>('/api/user', user);
  }

  update(user: UserDTO) {
    return this.http.put<UserDTO>('/api/user', user);
  }

  delete(id: number) {
    return this.http.delete('/api/user/' + id);
  }

  login(data: LoginDTO) {
    return this.http.post<AccessTokenDTO>('/api/login', data);
  }

  register(data: LoginDTO) {
    return this.http.post<LoginDTO>('/api/register', data);
  }
}
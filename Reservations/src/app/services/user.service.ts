import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  constructor() {}

  register(formData: any) {
    return this.http.post("http://localhost:3000/api/users", 
    formData
  );
  }

  login(formData: any) {
    return this.http.post("http://localhost:3000/api/token", {
      email: formData.email,
      password: formData.password,
    });
  }

}

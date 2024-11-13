import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private http = inject(HttpClient);

  constructor() { }

  getAllServices() {
    return this.http.get('http://localhost:3000/api/services');
  }

  getOneService(serviceID: string) {
    return this.http.get('http://localhost:3000/api/services/' + serviceID);
  }

}

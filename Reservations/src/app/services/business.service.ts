import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private http = inject(HttpClient)

  constructor() { }

  businessList(category?: string) {

    let endpoint = "http://localhost:3000/api/business";
    if (category) {
      endpoint+="?category=" + category;
    }

    return this.http.get(endpoint);
  }

  getAllBusiness() {
    return this.http.get('http://localhost:3000/api/business');
  }
  
  getOneBusiness(businessId: string) {
    return this.http.get('http://localhost:3000/api/business/' + businessId, );
  }

  create(newBusiness: any) {
    return this.http.post(
      'http://localhost:3000/api/business',
      newBusiness,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
        }),
      },
    );
  }

}

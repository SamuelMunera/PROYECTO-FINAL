import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  private http = inject(HttpClient);

  getAllReservations() {
    return this.http.get('http://localhost:3000/api/reservation', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('user_token')}`
      })
    });
  }

  getOneReservation(reservationID: string) {
    return this.http.get('http://localhost:3000/api/reservation/' + reservationID);
  }

  create(newReservation: any) {
    return this.http.post(
      'http://localhost:3000/api/reservation',
      newReservation,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user_token')}`
        }),
      },
    );
  }
}

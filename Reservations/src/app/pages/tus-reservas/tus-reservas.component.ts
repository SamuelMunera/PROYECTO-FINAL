import { Component, inject, Input, signal } from '@angular/core';
import { ServiceModel } from '../../models/service.model';
import { RouterLinkWithHref } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-tus-reservas',
  standalone: true,
  imports: [RouterLinkWithHref, CurrencyPipe],
  templateUrl: './tus-reservas.component.html',
  styleUrl: './tus-reservas.component.css'
})

export class TusReservasComponent {

  reservationService = inject(ReservationService);

  services = signal<any>(null);

  ngOnInit() {
    this.reservationService.getAllReservations().subscribe({
      next: (response: any) => {
        console.log(response);
        this.services.set(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}

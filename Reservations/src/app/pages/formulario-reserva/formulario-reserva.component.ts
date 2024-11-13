import { Component, inject, Input, signal } from '@angular/core';
import { FormServiceService } from '../../services/form-service.service';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { ReservationService } from '../../services/reservation.service';
import { DetalleNegocioComponent } from '../detalle-negocio/detalle-negocio.component';
import { BusinessService } from '../../services/business.service';
import { UserService } from '../../services/user.service';
import { ServiceModel } from '../../models/service.model';
import { Business } from '../../models/business.model';

@Component({
  selector: 'app-formulario-reserva',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './formulario-reserva.component.html',
  styleUrl: './formulario-reserva.component.css',
})
export class FormularioReservaComponent {

  private router = inject(Router);

  private serviceService = inject(ServiceService);
  private reservationService = inject(ReservationService);
  private userService = inject(UserService);

  businessService = inject(BusinessService);
  @Input() id: string = '';

  error = signal("");

  business = signal<null | Business>(null);

  serviceDetails = signal<any>(null);

  daySelected = signal<null | Date>(null);
  hourSelected = signal<null | string>(null);

  timeArray = [
    '09:30',
    '10:30',
    '11:30',
    '12:30',
    '13:30',
    '14:30',
    '15:30',
    '16:30',
    '17:30',
    '18:30',
  ];

  daysToRender = signal<{ name: string; date: Date }[]>([]);

  ngOnInit() {
    this.serviceService.getOneService(this.id).subscribe({
      next: (response: any) => {
        this.serviceDetails.set(response);
        console.log(response);
        this.daysToRender.set(this.calculateDays());
      },
      error: error => {
        console.log(error);
      }
    });
  }

  calculateDays() {
    const days = this.serviceDetails().businessDays.split(', ');
    const today = new Date(); // Fecha actual completa
    const dayRules = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ];

    const dayOfWeek = today.getDay(); // Índice del día de la semana (0 - 6)

    // Avanzamos un día para que el primer día a imprimir sea el siguiente al actual
    const dateIterator = new Date(today);
    dateIterator.setDate(today.getDate() + 1); // Comenzamos desde el día siguiente

    const nextTenDays = [];
    let dayCounter = 0; // Para contar cuántos días válidos hemos encontrado

    while (dayCounter < 10) {
      const dayName = dayRules[dateIterator.getDay()]; // Obtenemos el nombre del día actual de `dateIterator`

      // Solo procesamos la fecha si el día está en el array `days`
      if (days.includes(dayName)) {
        nextTenDays.push({
          name: dayName,
          date: new Date(dateIterator), // Guardamos una copia de la fecha actual
        });
        dayCounter++; // Solo aumentamos si es un día válido
      }

      // Avanzamos al día siguiente
      dateIterator.setDate(dateIterator.getDate() + 1);
    }
    return nextTenDays;
  }

  handleClickHour(hour: string) {
    this.hourSelected.set(hour);
  }

  handleClickDay(day: Date) {
    this.daySelected.set(day);
  }

  onSubmit() {
    let service = this.serviceDetails();
    
    this.reservationService.create(
      { 
        dateReservation: this.daySelected(),
        timeReservation: this.hourSelected(),
        status: "Active",
        priceTotal: service?.price,
        business: service?.businessService,
        service: this.id
      }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.serviceDetails.set(response);
        console.log(this.serviceDetails);
        this.router.navigate(["/"])
      },
      error: (error) => {
        this.error.set(error.error.message);
      }
    })
  }
}


import { Component, inject, Inject, Input, signal } from '@angular/core';
import { Business } from '../../models/business.model';import { BusinessService } from '../../services/business.service';
import { RouterLinkWithHref } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormServiceService } from '../../services/form-service.service';

@Component({
  selector: 'app-detalle-negocio',
  standalone: true,
  imports: [RouterLinkWithHref, CurrencyPipe],
  templateUrl: './detalle-negocio.component.html',
  styleUrl: './detalle-negocio.component.css'
})

export class DetalleNegocioComponent {

  private formService = inject(FormServiceService);

  businessService = inject(BusinessService);
  @Input() id: string = '';

  business = signal<null | Business>(null);

  ngOnInit() {
    this.businessService.getOneBusiness(this.id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.business.set(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

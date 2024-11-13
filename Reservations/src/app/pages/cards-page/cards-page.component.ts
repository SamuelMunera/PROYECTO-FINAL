import { Component, inject, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { BusinessService } from '../../services/business.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Business } from '../../models/business.model';


@Component({
  selector: 'app-cards-page',
  standalone: true,
  imports: [CardComponent, ReactiveFormsModule],
  templateUrl: './cards-page.component.html',
  styleUrl: './cards-page.component.css'
})
export class CardsPageComponent {

  private businessService = inject(BusinessService);
  categorySelect = new FormControl("");
  business = signal<null | Business[]>(null);

  ngOnInit() {
    this.businessService.businessList().subscribe(
      {
        next: (response) => {
          this.business.set(response as Business[]);
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  handleSelectChange(event: any){
    console.log(event?.target.value);
    this.businessService.businessList(event?.target.value).subscribe({
      next: (response) => {
        this.business.set(response as Business[]);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}

import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardsPageComponent } from './pages/cards-page/cards-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CardsPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private router = inject(Router);
  
  title = 'Reservations';

  showHeader = signal(true);
  showFooter = signal(true);

  constructor() {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          const currentUrl = event.urlAfterRedirects;
          console.log(currentUrl);
          
          this.showHeader.set( !currentUrl.includes("/login") && !currentUrl.includes("/register") );
          this.showFooter.set( !currentUrl.includes("/login") && !currentUrl.includes("/register") );

        }
      }
    );
  }
  

}

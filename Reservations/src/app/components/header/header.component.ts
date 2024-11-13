import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLinkWithHref
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  private authService = inject(AuthService);
  name = this.authService.nombreUsuario();
  idUser = this.authService.idUsusario();

}

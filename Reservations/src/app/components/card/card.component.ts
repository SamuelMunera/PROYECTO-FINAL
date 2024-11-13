import { Component, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  
  @Input() id = "";
  @Input() businessLogo = "";
  @Input() name = "";
  @Input() slogan = "";

}

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, HeaderComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {

  private userService = inject(UserService);
  private router = inject(Router);

  registerFrom = new FormGroup({
    email: new FormControl("", {
      validators: [Validators.required]
    }),
    name: new FormControl("", {
      validators: [Validators.required]
    }),
    address: new FormControl("", {
      validators: [Validators.required]
    }),
    phone: new FormControl("", {
      validators: [Validators.required]
    }),
    password: new FormControl("", {
      validators: [Validators.required]
    })
  });

  onSubmit() {
    if (this.registerFrom.valid) {
      this.userService.register(this.registerFrom.value).subscribe({
        next: response => {
          this.router.navigate(["/login"])
        },
        error: error => {
          console.log(error);
        }
      });
    } else {
      console.log("Campos no válidos");
    }
  }

}

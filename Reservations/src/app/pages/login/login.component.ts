import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  private router = inject(Router);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  error = signal("");

  loginForm = new FormGroup({
    email: new FormControl("", {
      validators: [Validators.required]
    }),
    password: new FormControl("", {
      validators: [Validators.required]
    })
  });

  onSubmit() {
    if ( this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.authService.setToken(response)
          this.router.navigate(["/"])
        },
        error: error => {
          this.error.set(error.error.message);
        }
      })
    } else {
      console.log("Campos no Válidos");
    }
  }

}

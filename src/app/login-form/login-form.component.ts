import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { loginService } from '../services/loginService';
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, CommonModule, JsonPipe],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  mail!: string;
  motDePasse!: string;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private loginService: loginService, private router: Router) {}

  submitForm(form: NgForm) {
    if (form.valid) {
      this.loginService.login(this.mail, this.motDePasse).subscribe({
        next: (response) => {
          if (response.status === 200) {
            alert("Connexion réussie, bienvenue !")
            this.successMessage = 'Connexion réussie !';
            this.errorMessage = null;
            this.router.navigate(['/datatable']);
          }
        },
        error: (error: Error) => {
          this.successMessage = null;
          this.errorMessage = error.message;
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      this.successMessage = null; 
    }
  }
}

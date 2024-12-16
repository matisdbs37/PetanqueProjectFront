import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Utilisateur } from '../models/utilisateur';
import { utilisateurService } from '../services/utilisateurService';
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [FormsModule, CommonModule, JsonPipe],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})
export class SignupFormComponent {
  nom!: string;
  prenom!: string;
  mail!: string;
  password!: string;
  username!: string;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  usersverif!: Utilisateur[];

  newUser: Utilisateur = {} as Utilisateur;

  constructor(private utilisateurService: utilisateurService, private router: Router) {}

  login() {
    this.router.navigate(['/']);
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.utilisateurService.getUtilisateurs().subscribe(
        data => {
          let verif: boolean = true;
          this.usersverif = data;
          for (let i = 0; i < this.usersverif.length; i++) {
            if (form.value.mail == this.usersverif[i].mail && form.value.username == this.usersverif[i].username) {
              verif = false;
              this.errorMessage = "Le mail et le nom d'utilisateur sont déjà pris !";
              this.successMessage = null;
            }
            else if (form.value.mail == this.usersverif[i].mail) {
              verif = false;
              this.errorMessage = "Le mail est déjà pris !";
              this.successMessage = null;
            }
            else if (form.value.username == this.usersverif[i].username) {
              verif = false;
              this.errorMessage = "Le nom d'utilisateur est déjà pris !";
              this.successMessage = null;
            }
          }

          if (verif == true) {
            this.newUser.nom = form.value.nom;
              this.newUser.prenom = form.value.prenom;
              this.newUser.mail = form.value.mail;
              this.newUser.password = form.value.password;
              this.newUser.username = form.value.username;
              this.utilisateurService.postUtilisateur(this.newUser).subscribe(
                response => {
                    this.successMessage = 'Inscription réussie ! Retournez sur la page de connexion et connectez vous !';
                    this.errorMessage = null;
                },
                
              );
          }
        }
      )
      
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      this.successMessage = null; 
    }
  }
}

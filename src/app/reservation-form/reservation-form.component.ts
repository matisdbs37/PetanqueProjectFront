import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Terrain } from '../models/terrain';
import { terrainService } from '../services/terrainService';
import { Utilisateur } from '../models/utilisateur';
import { utilisateurService } from '../services/utilisateurService';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../models/reservation';
import { ReservationId } from '../models/reservationId';
import { reservationService } from '../services/reservationService';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent {
  idterrain!: number;
  nomterrain!: string;
  idutilisateur!: number;
  username!: string;
  terrain!: Terrain;
  utilisateur!: Utilisateur;
  utilisateursverif!: Utilisateur[];
  reservationid!: ReservationId;
  reservation!: Reservation;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private terrainService: terrainService, private utilisateurService: utilisateurService, private resService: reservationService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.idterrain = +params['id'];
      this.nomterrain = params['nom'];
    });
  }

  submitForm(form: NgForm) {
    if (form.value.username != null) {
  
      this.terrainService.getOneTerrain(this.idterrain).subscribe(
        terrainData => {
          this.terrain = terrainData;
            this.utilisateurService.getUtilisateurs().subscribe(
              utilisateurData => {
                let verif: boolean = false;
                this.utilisateursverif = utilisateurData;
                for (let i = 0; i < this.utilisateursverif.length; i++) {
                  if (this.utilisateursverif[i].username == form.value.username) {
                    this.utilisateur = this.utilisateursverif[i];
                    verif = true;
                  }
                }

                if (!verif) {
                  this.successMessage = null;
                  this.errorMessage = "Aucun utilisateur ne correspond...";
                }
  
                this.reservationid = {
                  terrainId: this.terrain.id,
                  utilisateurId: this.utilisateur.id
                };
  
                this.reservation = {
                  id: this.reservationid,
                  reservation: 1
                };
  
                this.resService.postReservation(this.reservation).subscribe(
                  response => {
                    this.successMessage = "Réservation créée ! Redirection vers la liste des terrains...";
                    this.errorMessage = null;
                    setTimeout(() => {
                      this.router.navigate(['/datatable']);
                    }, 2000);
                  },
                  error => {
                    console.error('Erreur lors de la réservation :', error);
                    this.errorMessage = "Cet utilisateur a déjà réservé ce terrain !";
                    this.successMessage = null;
                  }
                );
              },
              err => {
                console.error('Erreur lors de la récupération de l\'utilisateur :', err);
                alert("Erreur utilisateur : " + err.status);
              }
            );
          
        },
        err => {
          console.error('Erreur lors de la récupération du terrain :', err);
          alert("Erreur terrain : " + err.status);
        }
      );
    }
  }
}

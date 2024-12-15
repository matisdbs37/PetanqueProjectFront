import { Component } from '@angular/core';
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
  imports: [FormsModule, JsonPipe],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent {
  idterrain!: number;
  idutilisateur!: number;
  terrain!: Terrain;
  utilisateur!: Utilisateur;
  reservationid!: ReservationId;
  reservation!: Reservation;

  constructor(private terrainService: terrainService, private utilisateurService: utilisateurService, private resService: reservationService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer les paramètres depuis l'URL
    this.route.queryParams.subscribe((params) => {
      this.idterrain = +params['id'];
    });
  }

  submitForm(form: NgForm) {
    if (form.value.idutilisateur != null) {
  
      this.terrainService.getOneTerrain(this.idterrain).subscribe(
        terrainData => {
          this.terrain = terrainData;
          alert("Terrain récupéré : " + this.terrain.id);
  
 
            this.utilisateurService.getOneUtilisateur(this.idutilisateur).subscribe(
              utilisateurData => {
                this.utilisateur = utilisateurData;
                alert("Utilisateur récupéré : " + this.utilisateur.id);
  
                this.reservationid = {
                  terrainId: this.terrain.id,
                  utilisateurId: this.utilisateur.id
                };
  
                this.reservation = {
                  id: this.reservationid,
                  reservation: 1
                };
                console.log("Objet envoyé : ", this.reservation);
  
                this.resService.postReservation(this.reservation).subscribe(
                  response => {
                    console.log('Réservation réussie :', response);
                    alert("Réservation créée !");
                    this.router.navigate(['/datatable']);
                  },
                  error => {
                    console.error('Erreur lors de la réservation :', error);
                    alert("Erreur lors de la création de la réservation : " + error.status);
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

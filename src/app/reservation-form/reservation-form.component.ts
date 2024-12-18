import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Terrain } from '../models/terrain';
import { terrainService } from '../services/terrainService';
import { reservationService } from '../services/reservationService';
import { JsonPipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservation } from '../models/reservation';
import { ReservationId } from '../models/reservationId';
import { utilisateurService } from '../services/utilisateurService';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  idterrain!: number;
  nomterrain!: string;
  nombreReservations: number = 1; // Nouveau champ pour le nombre de réservations
  terrain!: Terrain;
  reservationid!: ReservationId;
  reservation!: Reservation;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private terrainService: terrainService,
    private utilisateurService: utilisateurService,
    private resService: reservationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.idterrain = +params['id'];
      this.nomterrain = params['nom'];
    });
  }

  submitForm(form: NgForm) {
    if (form.value.nombreReservations != null && form.value.nombreReservations >= 1) {

      this.terrainService.getOneTerrain(this.idterrain).subscribe(
        terrainData => {
          this.terrain = terrainData;

          // Crée l'objet reservationId
          this.reservationid = {
            terrainId: this.terrain.id,
            utilisateurId: this.utilisateurService.getUserId()
          };

          // Création de la réservation
          this.reservation = {
            id: this.reservationid,
            reservation: this.nombreReservations // Utilisation du nombre de réservations
          };

          // Soumission de la réservation
          this.resService.postReservation(this.reservation).subscribe(
            response => {
              this.successMessage = "Réservation créée avec succès ! Redirection vers la liste des terrains...";
              this.errorMessage = null;
              setTimeout(() => {
                this.router.navigate(['/datatable']);
              }, 2000);
            },
            error => {
              console.error('Erreur lors de la réservation :', error);
              this.errorMessage = "Vous avez déjà réservé ce terrain, ou le nombre de terrain que vous voulez réserver dépasse la capacité actuel du terrain.";
              this.successMessage = null;
            }
          );
        },
        err => {
          console.error('Erreur lors de la récupération du terrain :', err);
          alert("Erreur terrain : " + err.status);
        }
      );
    } else {
      this.errorMessage = "Veuillez saisir un nombre de réservations valide.";
      this.successMessage = null;
    }
  }
}

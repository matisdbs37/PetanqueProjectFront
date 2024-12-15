import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { terrainService } from '../services/terrainService';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Terrain } from '../models/terrain';
import { utilisateurService } from '../services/utilisateurService';
import { Utilisateur } from '../models/utilisateur';
import { ReservationId } from '../models/reservationId';
import { Reservation } from '../models/reservation';
import { reservationService } from '../services/reservationService';


@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  onDelete(element: any) {
    if (confirm('Voulez-vous vraiment supprimer ce terrain ?')) {
      this.terrainService.deleteTerrain(element.id).subscribe({
        next: () => {
          alert('Terrain supprimé avec succès');
        },
        
      });
    }
  }
  onEdit(element: any) {
    this.router.navigate(['/terrainupdateform'], {
      queryParams: {
        id: element.id,
        nom: element.nom,
        quantite: element.quantite,
        description: element.description,
        pointGeo: element.pointGeo,
      },
    });
  }
  onReserve(element:any) {
    throw new Error('Method not implemented.');
  }

  displayedColumns: string[] = ['id', 'nom', 'quantite', 'description', 'pointGeo', 'edit', 'delete', 'reserve'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private terrainService: terrainService, private utilisateurService: utilisateurService, private resService: reservationService, private router: Router) {}

  listereservation!: Reservation[];

  ngOnInit(): void {
    this.loadTerrains();
    this.resService.getReservations().subscribe(data => {this.listereservation = data;}
     )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadTerrains(): void {
    this.terrainService.getTerrains().subscribe(data => {
      this.dataSource.data = data;
      });
  }

  formTerrain() {
    this.router.navigate(['/terrainform']);
  }

  idterrain!: number;
  idutilisateur!: number;
  terrain!: Terrain;
  utilisateur!: Utilisateur;
  reservationid!: ReservationId;
  reservation!: Reservation;

  

  submitForm(form: NgForm) {
    if (form.value.idterrain != null && form.value.idutilisateur != null) {
  
      this.terrainService.getOneTerrain(this.idterrain).subscribe(
        terrainData => {
          this.terrain = terrainData;
          alert("Terrain récupéré : " + this.terrain.id);
  
          if (this.terrain.quantite === 0) {
            alert("Terrain rempli, impossible de réserver");
          } else {
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
          }
        },
        err => {
          console.error('Erreur lors de la récupération du terrain :', err);
          alert("Erreur terrain : " + err.status);
        }
      );
    }
  }
  
  
}

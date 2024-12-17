import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { forkJoin } from 'rxjs'; // Import RxJS
import { Reservation } from '../models/reservation';
import { Terrain } from '../models/terrain';
import { Utilisateur } from '../models/utilisateur';
import { reservationService } from '../services/reservationService';
import { terrainService } from '../services/terrainService';
import { utilisateurService } from '../services/utilisateurService';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  displayedColumns: string[] = ['username', 'terrainName', 'delete'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private resService: reservationService,
    private terrainService: terrainService,
    private utilisateurService: utilisateurService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  terrainsverif!: Terrain[];
  utilisateursverif!: Utilisateur[];
  terraintodelete!: Terrain;
  utilisateurtodelete!: Utilisateur;

  onDelete(element: any): void {
    if (confirm(`Voulez-vous vraiment supprimer la réservation pour l'utilisateur "${element.username}" sur le terrain "${element.terrainName}" ?`)) {
      this.utilisateurService.getUtilisateurs().subscribe(
        data => {
          this.utilisateursverif = data;
          for (let i = 0; i < this.utilisateursverif.length; i++) {
            if (this.utilisateursverif[i].username == element.username) {
              this.utilisateurtodelete = this.utilisateursverif[i];
            }
          }

          this.terrainService.getTerrains().subscribe(
            data => {
              this.terrainsverif = data;
              for (let j = 0; j < this.terrainsverif.length; j++) {
                if (this.terrainsverif[j].nom == element.terrainName) {
                  this.terraintodelete = this.terrainsverif[j];
                }
              }

              this.resService.deleteReservation(this.utilisateurtodelete.id, this.terraintodelete.id).subscribe(
                {
                  next: () => {
                    this.loadAllData();
                  },
                  error: (err) => {
                    console.error('Erreur lors de la suppression de la réservation :', err);
                    alert('Erreur lors de la suppression');
                  }
                }
              )
            }
          )
        }
      );
    }
  }
  
  loadAllData(): void {
    forkJoin({
      reservations: this.resService.getReservations(),
      terrains: this.terrainService.getTerrains(),
      utilisateurs: this.utilisateurService.getUtilisateurs()
    }).subscribe(({ reservations, terrains, utilisateurs }) => {
      this.enrichReservations(reservations, terrains, utilisateurs);
    });
  }

  enrichReservations(reservations: Reservation[], terrains: Terrain[], utilisateurs: Utilisateur[]): void {
    const enrichedData = reservations.map((reservation) => {
      const terrain = terrains.find((t) => t.id === reservation.id.terrainId);
      const utilisateur = utilisateurs.find((u) => u.id === reservation.id.utilisateurId);
      return {
        username: utilisateur ? utilisateur.username : 'Utilisateur inconnu',
        terrainName: terrain ? terrain.nom : 'Terrain inconnu'
      };
    });
    this.dataSource.data = enrichedData;
  }
}

import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { terrainService } from '../services/terrainService';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Terrain } from '../models/terrain';
import { utilisateurService } from '../services/utilisateurService';
import { Reservation } from '../models/reservation';
import { reservationService } from '../services/reservationService';
import { filter } from 'rxjs';


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
          this.loadTerrains();
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
    }); this.loadTerrains();
  }

  terrain!: Terrain;
  onReserve(element:any) {
    this.terrainService.getOneTerrain(element.id).subscribe(
      data => {
        this.terrain = data;
        if (this.terrain.quantite === 0) {
          alert("Terrain rempli, impossible de réserver");
        }
        else {
          this.router.navigate(['/reservationform'], {
            queryParams: {
              id: this.terrain.id,
              nom: this.terrain.nom
            },
          });
        }
      }
    )
  }

  displayedColumns: string[] = ['id', 'nom', 'quantite', 'description', 'pointGeo', 'edit', 'delete', 'reserve'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private terrainService: terrainService, private utilisateurService: utilisateurService, private resService: reservationService, private router: Router) {}

  listereservation!: Reservation[];

  ngOnInit(): void {
    this.loadTerrains();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadTerrains();
    });
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
}

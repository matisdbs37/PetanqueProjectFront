import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { terrainService } from '../services/terrainService';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  onDelete(element: any) {
    if (confirm('Voulez-vous vraiment supprimer ce terrain ?')) {
      this.terrainService.deleteTerrain(element.id).subscribe({
        next: () => {
          alert('Terrain supprimé avec succès'); this.loadTerrains();
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
  onReserve(element:any) {
    throw new Error('Method not implemented.');
  }

  displayedColumns: string[] = ['id', 'nom', 'quantite', 'description', 'pointGeo', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private terrainService: terrainService, private router: Router) {}


  ngOnInit(): void {
    this.loadTerrains();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadTerrains();
    });
  }

  ngOnChanges(): void {
    this.loadTerrains();
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

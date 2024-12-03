import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { terrainService } from '../services/terrainService';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  onDelete(_t78: any) {
    throw new Error('Method not implemented.');
  }
  onEdit(_t66: any) {
    throw new Error('Method not implemented.');
  }

  displayedColumns: string[] = ['id', 'nom', 'quantite', 'description', 'pointGeo', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private terrainService: terrainService, private router: Router) {}


  ngOnInit(): void {
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

import { Component } from '@angular/core';
import { Terrain } from '../models/terrain';
import { terrainService } from '../services/terrainService';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-terrain',
  standalone: true,
  templateUrl: './terrain.component.html',
  styleUrl: './terrain.component.css'
})

export class TerrainComponent {

  terrains: Terrain[] = []; // Variable pour stocker les données
  terrain!: Terrain;

  constructor(private terrainService: terrainService) {}

  ngOnInit(): void {
    this.loadTerrains();
  }

  loadTerrains(): void {
    this.terrainService.getTerrains().subscribe(data => {
      this.terrains = data;
    });
  }
}

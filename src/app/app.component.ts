import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Terrain } from './models/terrain';
import { terrainService } from './services/terrainService';
import { JsonPipe } from '@angular/common';
import { TerrainFormComponent } from "./terrain-form/terrain-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, TerrainFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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

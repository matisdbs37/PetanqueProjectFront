import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Terrain } from './models/terrain';
import { terrainService } from './services/terrainService';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
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
    this.terrainService.getOneTerrain(3).subscribe(data => {
      this.terrain = data;
    });
  }
}

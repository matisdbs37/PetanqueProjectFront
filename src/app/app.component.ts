import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Terrain } from './models/terrain';
import { terrainService } from './services/terrainService';
import { JsonPipe } from '@angular/common';
import { TerrainComponent } from "./terrain/terrain.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, TerrainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}

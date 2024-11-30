import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Terrain } from './models/terrain';
import { terrainService } from './services/terrainService';
import { JsonPipe } from '@angular/common';
import { TerrainFormComponent } from "./terrain-form/terrain-form.component";
import { TerrainComponent } from "./terrain/terrain.component";
import { DataTableComponent } from './data-table/data-table.component';
import { LoginFormComponent } from "./login-form/login-form.component"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DataTableComponent, TerrainFormComponent, LoginFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
}

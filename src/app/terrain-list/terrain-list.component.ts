import { Component } from '@angular/core';
import { TerrainComponent } from '../terrain/terrain.component';

@Component({
  selector: 'app-terrain-list',
  standalone: true,
  imports: [TerrainComponent],
  templateUrl: './terrain-list.component.html',
  styleUrl: './terrain-list.component.css'
})
export class TerrainListComponent {

}

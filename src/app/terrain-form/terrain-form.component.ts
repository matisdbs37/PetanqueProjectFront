import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Terrain } from '../models/terrain';
import { terrainService } from '../services/terrainService';

@Component({
  selector: 'app-terrain-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './terrain-form.component.html',
  styleUrl: './terrain-form.component.css'
})
export class TerrainFormComponent {
  id!: number;
  nom!: string;
  quantite!: number;
  description!: string;
  pointgeo!: string;

  newTerrain!: Terrain;

  constructor(private terrainService: terrainService) {}

  submitForm(form: NgForm) {
    alert(`Terrain ajouté !`);
    //this.newTerrain.id = form.value.id;
    this.newTerrain.nom = form.value.nom;
    this.newTerrain.quantite = form.value.quantite;
    this.newTerrain.description = form.value.description;
    this.newTerrain.pointGeo = form.value.pointGeo;

    this.terrainService.postTerrain(this.newTerrain).subscribe(
      reponse => {console.log('Server response:', reponse);}
    )
  }
}

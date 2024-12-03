import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Terrain } from '../models/terrain';
import { terrainService } from '../services/terrainService';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terrain-form',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './terrain-form.component.html',
  styleUrl: './terrain-form.component.css'
})
export class TerrainFormComponent {
  nom!: string;
  quantite!: number;
  description!: string;
  pointGeo!: string;

  newTerrain: Terrain = {} as Terrain;

  constructor(private terrainService: terrainService, private router: Router) {}

  private isValidPointGeo(pointGeo: string): boolean {
    const regex = /^-?\d{1,3}(\.\d+)?\s*,\s*\d{1,3}(\.\d+)?$/;
    return regex.test(pointGeo);
  }

  submitForm(form: NgForm) {
    if (form.value.nom != null && form.value.quantite != null && form.value.description != null && form.value.pointGeo != null) {
      if (!this.isValidPointGeo(form.value.pointGeo)) {
        alert("Veuillez entrer un point géographique valide au format XX.YY, ZZ.TT");
        return;
      }
      alert(`Terrain ajouté !`);
      this.newTerrain.nom = form.value.nom;
      this.newTerrain.quantite = form.value.quantite;
      this.newTerrain.description = form.value.description;
      this.newTerrain.pointGeo = form.value.pointGeo;
  
      this.terrainService.postTerrain(this.newTerrain).subscribe(
        reponse => {console.log('Server response:', reponse);}
      )
      this.router.navigate(['/datatable'])
    }
    else alert("Veuillez remplir tous les champs !")
   
  }
}

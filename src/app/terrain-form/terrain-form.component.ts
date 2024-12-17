import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Terrain } from '../models/terrain';
import { terrainService } from '../services/terrainService';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terrain-form',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe],
  templateUrl: './terrain-form.component.html',
  styleUrl: './terrain-form.component.css'
})
export class TerrainFormComponent {
  nom!: string;
  quantite!: number;
  description!: string;
  pointGeo!: string;

  newTerrain: Terrain = {} as Terrain;

  terrainsverif!: Terrain[];

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private terrainService: terrainService, private router: Router) {}

  private isValidPointGeo(pointGeo: string): boolean {
    const regex = /^-?\d{1,3}(\.\d+)?\s*,\s*\d{1,3}(\.\d+)?$/;
    return regex.test(pointGeo);
  }

  submitForm(form: NgForm) {
    if (form.value.nom != null && form.value.quantite != null && form.value.description != null && form.value.pointGeo != null) {
      if (!this.isValidPointGeo(form.value.pointGeo)) {
        this.errorMessage = "Veuillez entrer un point géographique valide au format XX.YY, ZZ.TT";
        this.successMessage = null;
        return;
      }
      else {
        this.terrainService.getTerrains().subscribe(
          data => {
            let verif: boolean = true;
            this.terrainsverif = data;
            for (let i = 0; i < this.terrainsverif.length; i++) {
              if (form.value.nom == this.terrainsverif[i].nom) {
                verif = false;
                this.errorMessage = "Nom de terrain déjà existant !";
                this.successMessage = null;
              }
            }
  
            if (verif == true) {
                this.newTerrain.nom = form.value.nom;
                this.newTerrain.quantite = form.value.quantite;
                this.newTerrain.description = form.value.description;
                this.newTerrain.pointGeo = form.value.pointGeo;
                this.terrainService.postTerrain(this.newTerrain).subscribe(
                  response => {
                      this.successMessage = 'Terrain ajouté ! Redirection vers la liste des terrains...';
                      this.errorMessage = null;
                  },
                  
                );
                setTimeout(() => {
                  this.router.navigate(['/datatable']);
                }, 2000);
            }
          }
        )
      }
    }
    else alert("Veuillez remplir tous les champs !")
   
  }
}

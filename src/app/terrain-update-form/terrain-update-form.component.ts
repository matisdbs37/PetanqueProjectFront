import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Terrain } from '../models/terrain';
import { terrainService } from '../services/terrainService';
import { JsonPipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-terrain-form',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe],
  templateUrl: './terrain-update-form.component.html',
  styleUrl: './terrain-update-form.component.css'
})
export class TerrainUpdateFormComponent implements OnInit {
  id!: number;
  nom!: string;
  quantite!: number;
  description!: string;
  pointGeo!: string;

  updatedTerrain: Terrain = {} as Terrain;

  terrainsverif!: Terrain[];

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private terrainService: terrainService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = +params['id'];
      this.nom = params['nom'] || '';
      this.quantite = +params['quantite'] || 0;
      this.description = params['description'] || '';
      this.pointGeo = params['pointGeo'] || '';
    });
  }

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
                this.updatedTerrain.nom = form.value.nom;
                this.updatedTerrain.quantite = form.value.quantite;
                this.updatedTerrain.description = form.value.description;
                this.updatedTerrain.pointGeo = form.value.pointGeo;
                this.terrainService.putTerrain(this.id, this.updatedTerrain).subscribe(
                  response => {
                    this.successMessage = 'Terrain modifié ! Redirection vers la liste des terrains...';
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

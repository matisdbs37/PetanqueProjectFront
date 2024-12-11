import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Terrain } from '../models/terrain';
import { terrainService } from '../services/terrainService';
import { JsonPipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-terrain-form',
  standalone: true,
  imports: [FormsModule, JsonPipe],
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

  constructor(private terrainService: terrainService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    // Récupérer les paramètres depuis l'URL
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
        alert("Veuillez entrer un point géographique valide au format XX.YY, ZZ.TT");
        return;
      }
      this.updatedTerrain.nom = form.value.nom;
      this.updatedTerrain.quantite = form.value.quantite;
      this.updatedTerrain.description = form.value.description;
      this.updatedTerrain.pointGeo = form.value.pointGeo;
  
      this.terrainService.putTerrain(this.id, this.updatedTerrain).subscribe(
        reponse => {alert('Terrain modifié avec succès');}
      )
      this.router.navigate(['/datatable'])
    }
    else alert("Veuillez remplir tous les champs !")
   
  }
}
import {Injectable} from '@angular/core';
import {terrainService} from '../services/terrainService'
import L, {Browser} from "leaflet";
import win = Browser.win;

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private leaflet: any;

  constructor(private readonly terrainService: terrainService) {
  }

  async initLeaflet(): Promise<void> {
    if (typeof window !== 'undefined') {
      this.leaflet = await import('leaflet');
    }
  }

  async makeMarkers(map: L.Map): Promise<void> {
    if(this.leaflet && map){
      this.terrainService.getTerrains().subscribe({
        next: (terrains) => {
          terrains.forEach((terrain) => {
            if (terrain.pointGeo) {
              const [latitude, longitude] = terrain.pointGeo.split(',').map(coord => parseFloat(coord.trim()));
              const marker = this.leaflet.marker([latitude, longitude]);
              marker.bindPopup(`
                <b>${terrain.nom}</b><br>
                <strong>Description:</strong> ${terrain.description}<br>
                <strong>Quantite restante:</strong> ${terrain.quantite}<br>
              `);
              marker.addTo(map)
            }
          });
        }
      });
    }
  }
}

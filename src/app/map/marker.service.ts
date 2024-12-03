import {Injectable} from '@angular/core';
import {terrainService} from '../services/terrainService'

import {Terrain} from "../models/terrain";
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
      this.leaflet = await import('leaflet'); // Import dynamique
    }
  }

  //initialize markers for petanque fields
  async makeMarkers(map: L.Map): Promise<void> {
    //dynamic inport of leaflet make sure to be in a client environement not in server
    if(this.leaflet && map){
      // Fetch all terrains depuis l'API
      this.terrainService.getTerrains().subscribe({
        next: (terrains) => {
          // Get point geo for each terrains
          terrains.forEach((terrain) => {
            if (terrain.pointGeo) {
              //split lat and long bc in the same string in the DB
              const [latitude, longitude] = terrain.pointGeo.split(',').map(coord => parseFloat(coord.trim()));
              const marker = this.leaflet.marker([latitude, longitude]);
              marker.addTo(map)
            }
          });
        }
      });
    }
  }
}

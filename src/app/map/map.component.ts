import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit, OnInit{
  //specify the map type from leaflet
  private map! : L.Map;

  constructor() {}

  private async initMap(): Promise<void> {
    const L = await import('leaflet');
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  async ngOnInit(): Promise<void> {
    // Vérifier si on est dans un environnement client
    if (typeof window !== 'undefined') {
      const L = await import('leaflet'); // Import dynamique de Leaflet
      this.initMap();
    }
  }
}

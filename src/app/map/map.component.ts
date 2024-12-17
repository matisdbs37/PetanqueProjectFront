import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MarkerService} from "./marker.service"
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements AfterViewInit, OnInit {
  private map !: L.Map;

  private async initMap(): Promise<void> {
    const L = await import('leaflet');
    this.map = L.map('map', {
      center: [47.383333, 0.683333],
      zoom: 12
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.initIcons(L)
  }

  private initIcons(L: any): void {
    const iconRetinaUrl = '../../assets/marker-icon-2x.png';
    const iconUrl = '../../assets/marker-icon.png';
    const shadowUrl = '../../assets/marker-shadow.png';

    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    L.Marker.prototype.options.icon = iconDefault;
  }

  constructor(private markerService: MarkerService) {}

  async ngAfterViewInit(): Promise<void> {
    await this.initMap();
    await this.markerService.initLeaflet();
    await this.markerService.makeMarkers(this.map);
  }

  async ngOnInit(): Promise<void> {}
}

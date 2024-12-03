import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Terrain } from './models/terrain';
import { terrainService } from './services/terrainService';
import { JsonPipe } from '@angular/common';
import { TerrainFormComponent } from "./terrain-form/terrain-form.component";
import { TerrainComponent } from "./terrain/terrain.component";
import { DataTableComponent } from './data-table/data-table.component';
import { LoginFormComponent } from "./login-form/login-form.component"
import { HeaderComponent } from './header/header.component';
import { filter } from 'rxjs';
import { HeaderLoginComponent } from './header-login/header-login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DataTableComponent, TerrainFormComponent, LoginFormComponent, HeaderComponent, RouterOutlet, HeaderLoginComponent, CommonModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  showHeaderLogin: boolean = false;
  showHeader: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        console.log('URL actuelle:', url); // Debug
        this.showHeaderLogin = url === '/';
        this.showHeader = url !== '/';
      });
  }
  
}

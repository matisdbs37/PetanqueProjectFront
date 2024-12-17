import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { filter } from 'rxjs';
import { HeaderLoginComponent } from './header-login/header-login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, HeaderLoginComponent, CommonModule, NgIf],

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
        this.showHeaderLogin = url === '/' || url === '/signupform';
        this.showHeader = url !== '/' && url !== '/signupform';
      });
  }
  
}

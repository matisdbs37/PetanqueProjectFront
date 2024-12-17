import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  message: string | null = null;

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/']);
  }

  afficherList() {
    this.router.navigate(['/datatable']);
  }

  afficherMap() {
    this.router.navigate(['/map']);
  }

  reservations() {
    this.router.navigate(['/reservations']);
  }
}

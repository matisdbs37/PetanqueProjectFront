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
  constructor(private router: Router) {}

  logout() {
    alert("Déconnexion réussie !");
    this.router.navigate(['']);
  }

  afficherList() {
    this.router.navigate(['/datatable']);
  }

  afficherMap() {
    this.router.navigate(['/map']);
  }
}

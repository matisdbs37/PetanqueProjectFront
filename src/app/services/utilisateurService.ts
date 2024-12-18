import { HttpClient } from "@angular/common/http";
import { Utilisateur } from "../models/utilisateur";
import { catchError, Observable } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class utilisateurService {
    API_URL: string = "http://localhost:8080";
    API_ENTITY_NAME: string = "utilisateur";

    private userId: number = 0;

    constructor(private readonly http: HttpClient) {}

    getUtilisateurs(): Observable<Utilisateur[]> {
        return this.http.get<Utilisateur[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`).pipe(
            catchError(error => {
              console.error('Erreur lors du chargement des utilisateurs.', error);
              throw error;
            })
          );
    }

    getOneUtilisateur(idUtilisateur: number): Observable<Utilisateur> {
        return this.http.get<Utilisateur>(`${this.API_URL}/${this.API_ENTITY_NAME}/${idUtilisateur}`).pipe(
            catchError(error => {
                console.error("L'utilisateur est introuvable.", error);
                throw error;
            })
        );
    }

    postUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
        return this.http.post<Utilisateur>(`${this.API_URL}/${this.API_ENTITY_NAME}`, utilisateur).pipe(
            catchError(error => {
                console.error("Erreur lors de l'ajout de l'utilisateur.", error);
                throw error;
            })
        )
    }

    putUtilisateur(idPreviousUtilisateur: number, newUtilisateur: Utilisateur): Observable<Utilisateur> {
        return this.http.put<Utilisateur>(`${this.API_URL}/${this.API_ENTITY_NAME}/${idPreviousUtilisateur}`, newUtilisateur).pipe(
            catchError(error => {
                console.error("Erreur lors de la modification de l'utilisateur.", error);
                throw error;
            })
        )
    }

    deleteUtilisateur(idUtilisateur: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${this.API_ENTITY_NAME}/${idUtilisateur}`).pipe(
            catchError(error => {
                console.error("Erreur lors de la suppression de l'utilisateur.", error);
                throw error;
            })
        )
    }

    setUserId(id: number): void {
      this.userId = id;
    }

    getUserId(): number {
      return this.userId;
    }
}

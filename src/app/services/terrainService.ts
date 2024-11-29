import { HttpClient } from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { Terrain } from "../models/terrain";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class terrainService {
    API_URL: string = "http://localhost:8080";
    API_ENTITY_NAME: string = "terrain";

    constructor(private readonly http: HttpClient) {}

    getTerrains(): Observable<Terrain[]> {
        return this.http.get<Terrain[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`).pipe(
            catchError(error => {
              console.error('Erreur lors du chargement des terrains.', error);
              throw error;
            })
          );
    }

    getOneTerrain(idTerrain: number): Observable<Terrain> {
        return this.http.get<Terrain>(`${this.API_URL}/${this.API_ENTITY_NAME}/${idTerrain}`).pipe(
            catchError(error => {
                console.error('Le terrain est introuvable.', error);
                throw error;
            })
        );
    }

    postTerrain(terrain: Terrain): Observable<Terrain> {
        return this.http.post<Terrain>(`${this.API_URL}/${this.API_ENTITY_NAME}`, terrain).pipe(
            catchError(error => {
                console.error("Erreur lors de l'ajout du terrain.", error);
                throw error;
            })
        )
    }

    putTerrain(idPreviousTerrain: number, newTerrain: Terrain): Observable<Terrain> {
        return this.http.put<Terrain>(`${this.API_URL}/${this.API_ENTITY_NAME}/${idPreviousTerrain}`, newTerrain).pipe(
            catchError(error => {
                console.error("Erreur lors de la modification du terrain.", error);
                throw error;
            })
        )
    }

    deleteTerrain(idTerrain: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${this.API_ENTITY_NAME}/${idTerrain}`).pipe(
            catchError(error => {
                console.error("Erreur lors de la suppression du terrain.", error);
                throw error;
            })
        )
    }
}
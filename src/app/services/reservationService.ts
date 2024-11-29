import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reservation } from "../models/reservation";
import { catchError, Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class reservationService {
    API_URL: string = "http://localhost:8080/api";
    API_ENTITY_NAME: string = "reservation";

    constructor(private readonly http: HttpClient) {}

    getReservations(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`).pipe(
            catchError(error => {
              console.error('Erreur lors du chargement des réservations.', error);
              throw error;
            })
          );
    }

    getOneReservation(idReservation: number): Observable<Reservation> {
        return this.http.get<Reservation>(`${this.API_URL}/${this.API_ENTITY_NAME}/${idReservation}`).pipe(
            catchError(error => {
                console.error('La réservation est introuvable.', error);
                throw error;
            })
        );
    }

    postReservation(reservation: Reservation): Observable<Reservation> {
        return this.http.post<Reservation>(`${this.API_URL}/${this.API_ENTITY_NAME}`, reservation).pipe(
            catchError(error => {
                console.error("Erreur lors de l'ajout de la réservation.", error);
                throw error;
            })
        )
    }

    putReservation(idPreviousReservation: number, newReservation: Reservation): Observable<Reservation> {
        return this.http.put<Reservation>(`${this.API_URL}/${this.API_ENTITY_NAME}/${idPreviousReservation}`, newReservation).pipe(
            catchError(error => {
                console.error("Erreur lors de la modification de la réservation.", error);
                throw error;
            })
        )
    }

    deleteReservation(idReservation: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${this.API_ENTITY_NAME}/${idReservation}`).pipe(
            catchError(error => {
                console.error("Erreur lors de la suppression de la réservation.", error);
                throw error;
            })
        )
    }
}
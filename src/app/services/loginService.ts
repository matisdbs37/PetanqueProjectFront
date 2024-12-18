import { HttpClient, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";

export interface ErrorResponse {
    timestamp: number;
    status: number;
    error: string;
    message: string;
}

@Injectable({
    providedIn: 'root'
})

export class loginService {
    API_URL: string = "http://localhost:8080";
    API_ENTITY_NAME: string = "login";

    constructor(private readonly http: HttpClient) {}

    login(mail: string, password: string): Observable<HttpResponse<number>> {
        return this.http.get<number>(`${this.API_URL}/${this.API_ENTITY_NAME}/${mail}/${password}`, { observe: 'response' }).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = "";

                if (error.status === 404) {
                    errorMessage = "Mot de passe ou mail incorrect";
                } else {
                    errorMessage = "Erreur lors de la connexion, veuillez réessayer plus tard";
                }

                console.error("Erreur lors de la connexion:", error.message);
                return throwError(() => new Error(errorMessage));
            })
        );
    }
}

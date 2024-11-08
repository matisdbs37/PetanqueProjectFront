import { HttpClient } from "@angular/common/http";
import { Service } from "./service";

export class reservationService extends Service {
    API_URL: string = "http://localhost:8080/api";
    API_ENTITY_NAME: string = "reservations";

    constructor(private readonly http: HttpClient) {
        super();
    }
}
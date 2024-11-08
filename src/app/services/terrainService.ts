import { HttpClient } from "@angular/common/http";
import { Service } from "./service";

export class terrainService extends Service {
    API_URL: string = "http://localhost:8080/api";
    API_ENTITY_NAME: string = "terrains";

    constructor(private readonly http: HttpClient) {
        super();
    }
}
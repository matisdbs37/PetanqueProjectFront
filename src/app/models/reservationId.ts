import { Utilisateur } from "./utilisateur";
import { Terrain } from "./terrain";

export interface ReservationId {
    utilisateur: Utilisateur;
    terrain: Terrain;
}
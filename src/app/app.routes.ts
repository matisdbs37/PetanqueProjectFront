import { Routes } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { TerrainFormComponent } from './terrain-form/terrain-form.component';
import { MapComponent } from './map/map.component';
import { TerrainUpdateFormComponent } from './terrain-update-form/terrain-update-form.component';

export const routes: Routes = [
    { path: '', component: LoginFormComponent },
    { path: 'datatable', component: DataTableComponent },
    { path: 'terrainform', component: TerrainFormComponent},
    { path: 'map', component: MapComponent},
    { path: 'terrainupdateform', component: TerrainUpdateFormComponent}
];

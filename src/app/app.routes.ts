import { Routes } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { TerrainFormComponent } from './terrain-form/terrain-form.component';

export const routes: Routes = [
    { path: '', component: LoginFormComponent },
    { path: 'datatable', component: DataTableComponent },
    { path: 'terrainform', component: TerrainFormComponent}
];

import { Routes } from '@angular/router';
import { BibliaComponent } from './biblia/biblia.component';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./home/home.component'),
        pathMatch: 'full'
    },
    {path:'leer', component: BibliaComponent },
];

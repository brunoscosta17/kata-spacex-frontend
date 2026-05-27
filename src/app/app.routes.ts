import { Routes } from '@angular/router';
import { LaunchesListComponent } from './components/launches-list/launches-list';

export const routes: Routes = [
      { path: "", component: LaunchesListComponent, pathMatch: "full" },
      {
            path: 'launch/:id',
            loadComponent: () => import('./components/launch-detail/launch-detail').then(m => m.LaunchDetailComponent)
      }
];

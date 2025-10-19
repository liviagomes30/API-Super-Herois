import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/herois', pathMatch: 'full' },
  {
    path: 'herois',
    loadComponent: () => import('./components/hero-list/hero-list').then((m) => m.HeroList),
  },
  {
    path: 'herois/novo',
    loadComponent: () => import('./components/hero-form/hero-form').then((m) => m.HeroForm),
  },
  {
    path: 'herois/editar/:id',
    loadComponent: () => import('./components/hero-form/hero-form').then((m) => m.HeroForm),
  },
  {
    path: 'herois/:id',
    loadComponent: () => import('./components/hero-detail/hero-detail').then((m) => m.HeroDetail),
  },
  { path: '**', redirectTo: '/herois' },
];

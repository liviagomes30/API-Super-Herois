import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  {
    path: 'heroes',
    loadComponent: () => import('./components/hero-list/hero-list').then((m) => m.HeroList),
  },
  {
    path: 'heroes/new',
    loadComponent: () => import('./components/hero-form/hero-form').then((m) => m.HeroForm),
  },
  {
    path: 'heroes/edit/:id',
    loadComponent: () => import('./components/hero-form/hero-form').then((m) => m.HeroForm),
  },
  {
    path: 'heroes/:id',
    loadComponent: () => import('./components/hero-detail/hero-detail').then((m) => m.HeroDetail),
  },
  { path: '**', redirectTo: '/heroes' },
];

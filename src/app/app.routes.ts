import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./components/list-categories/list-categories.component').then(m => m.ListCategoriesComponent) },
    {path: 'category', loadComponent: () => import('./components/category/category.component').then(m => m.CategoryComponent) },
];

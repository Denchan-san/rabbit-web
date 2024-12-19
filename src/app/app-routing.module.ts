import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { JwtAuthGuard } from './shared/auth/jwt-auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/threads', pathMatch: 'full' },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent
      ),
  },
  {
    path: 'threads',
    loadChildren: () =>
      import('./pages/threads/threads.module').then((m) => m.ThreadsModule),
    canActivate: [JwtAuthGuard], // Protects the whole module
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
})
export class AppRoutingModule {}

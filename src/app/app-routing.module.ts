import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/threads', pathMatch: 'full' },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
    //canActivate: [AuthGuard],
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'threads',
    loadChildren: () =>
      import('./pages/threads/threads.module').then((m) => m.ThreadsModule),
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
})
export class AppRoutingModule {}

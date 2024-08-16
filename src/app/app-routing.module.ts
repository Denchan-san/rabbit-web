import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/threads', pathMatch: 'full' },
  {
    path: 'threads',
    loadChildren: () =>
      import('./threads/threads.module').then((m) => m.ThreadsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes , { preloadingStrategy: PreloadAllModules })],
})
export class AppRoutingModule {}

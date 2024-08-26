import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ThreadsModule } from './threads/threads.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, AuthComponent],
  imports: [
    ThreadsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [
    //provideClientHydration()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

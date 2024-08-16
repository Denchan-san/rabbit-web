import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ThreadsModule } from './threads/threads.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ThreadsRoutingModule } from './threads/threads-routing.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
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

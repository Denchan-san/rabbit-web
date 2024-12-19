import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ThreadsModule } from './pages/threads/threads.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PostsModule } from './pages/posts/posts.module';
import { CommentariesModule } from './pages/commentaries/commentaries.module';
import { UserProfileModule } from './pages/user-profile/user-profile.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    ThreadsModule,
    PostsModule,
    CommentariesModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    UserProfileModule
  ],
  providers: [
    //provideClientHydration()
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ThreadsModule } from './threads/threads.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ThreadsRoutingModule } from './threads/threads-routing.module';
import { PostsComponent } from './posts/posts.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostItemComponent } from './posts/post-list/post-item/post-item.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, PostsComponent, PostListComponent, PostItemComponent, PostEditComponent],
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

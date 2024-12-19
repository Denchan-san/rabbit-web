import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JwtAuthGuard } from './jwt-auth.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    JwtAuthGuard
  ]
})
export class AuthModule {}

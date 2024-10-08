import { NgModule } from '@angular/core';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown/dropdown.directive';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule,
  ],
})
export class SharedModule {}

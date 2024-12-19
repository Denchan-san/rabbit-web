import { NgModule } from "@angular/core";
import { JwtAuthGuard } from "../../shared/auth/jwt-auth.guard";
import { UserProfileComponent } from "./user-profile.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: 'my-profile', component: UserProfileComponent, canActivate: [JwtAuthGuard] }, // Protect list route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
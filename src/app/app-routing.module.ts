import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user_panel/home/home.component';
import { AboutComponent } from './user_panel/about/about.component';
import { WorkComponent } from './user_panel/work/work.component';
import { DashboardComponent } from './admin_panel/dashboard/dashboard.component';
import { WorkResolverService } from './services/work-resolver.service';

const routes: Routes = [
  { path: "Home", component: HomeComponent, title: "Mahmoud Hilal | Home" },
  { path: "About", component: AboutComponent, title: "Mahmoud Hilal | About" },
  { path: "Work", component: WorkComponent, title: "Mahmoud Hilal | Work", resolve: { allWork: WorkResolverService } },
  { path: "Dashboard", component: DashboardComponent, title: "Dashboard" },
  { path: "**", redirectTo: "Home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

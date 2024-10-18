import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { DrillDownComponent } from './components/drill-down/drill-down.component';

const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' }, // Redirect to overview on app load
  { path: 'overview', component: OverviewComponent }, // Route to overview component
  { path: 'drill-down/:id', component: DrillDownComponent }, // Route to drill-down with dynamic ID
  { path: '**', redirectTo: '/overview' }, // Redirect unknown routes to overview
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

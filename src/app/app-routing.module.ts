import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteLayoutComponent } from './core/layouts/site-layout/site-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PublicDashboardComponent } from './core/layouts/public-dashboard/public-dashboard.component';

const routes: Routes = [
  { path: '', component: PublicDashboardComponent, pathMatch: 'full' },
  { 
    path: '', 
    canActivate: [AuthGuard],
    component: SiteLayoutComponent,
    children: [
      {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      {path: 'ticket', loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule) },
    ]
  },
  // {
  //   path:'',
  //   pathMatch : 'full',
  //   redirectTo: '/dashboard'
  // },
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/auth/components/not-found/not-found.component';
import { UserLayouttComponent } from './shared/modules/reusable-component/components/layouts/user-layoutt/user-layoutt.component';
import { AdminLayoutComponent } from './shared/modules/reusable-component/components/layouts/admin-layout/admin-layout.component';
import { ApproverLayoutComponent } from './shared/modules/reusable-component/components/layouts/approver-layout/approver-layout.component';
import { SessionServiceService } from './core/service/Session/session-service.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'user',
    component: UserLayouttComponent,
    canActivate: [SessionServiceService],
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [SessionServiceService],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'approver',
    component: ApproverLayoutComponent,
    canActivate: [SessionServiceService],
    loadChildren: () => import('./modules/approver/approver.module').then(m => m.ApproverModule)
  },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

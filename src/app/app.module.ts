import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './modules/auth/components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { ApproverModule } from './modules/approver/approver.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReusableComponentModule } from './shared/modules/reusable-component/reusable-component.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';





@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    UserModule,
    ApproverModule,
    AdminModule,
    AuthModule,
    ReusableComponentModule,
    AppRoutingModule,
    NgxSkeletonLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

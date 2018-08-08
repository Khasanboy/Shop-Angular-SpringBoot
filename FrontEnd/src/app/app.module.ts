import { AdminModule } from '@admin/admin.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { CoreModule } from '@core/core.module';
import { MembershipModule } from '@membership/membership.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptorService } from '@shared/services/token-interceptor.service';
import { SharedModule } from '@shared/shared.module';
import { ShoppingModule } from '@shopping/shopping.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FlashMessagesModule.forRoot(),
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    MembershipModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('accessToken');
        },
        whitelistedDomains: [],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

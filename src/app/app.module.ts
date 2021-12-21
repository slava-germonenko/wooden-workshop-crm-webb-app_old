import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { ToolbarModule, ToolbarService } from '@framework/toolbar';
import { WithTokenInterceptor } from '@common/interceptors';
import { UserService, UserSessionService } from '@common/services';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { initApp } from './app-initializer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ToolbarModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithTokenInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (
        toolbarService: ToolbarService,
        userService: UserService,
        userSessionService: UserSessionService,
      ) => () => initApp(toolbarService, userService, userSessionService),
      multi: true,
      deps: [ToolbarService, UserService, UserSessionService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import localeRu from '@angular/common/locales/ru';
// eslint-disable-next-line
import 'froala-editor/js/plugins.pkgd.min.js';
// eslint-disable-next-line
import 'froala-editor/js/languages/ru.js';

import { ToolbarModule, ToolbarService } from '@framework/toolbar';
import { WithTokenInterceptor } from '@common/interceptors';
import { CommonPipesModule } from '@common/pipes';
import { UserSessionService } from '@common/services';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { initApp } from './app-initializer';
import { RussianMatPaginatorIntl } from './i18n';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonPipesModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ToolbarModule,
  ],
  providers: [
    CookieService,
    {
      provide: LOCALE_ID,
      useValue: 'ru',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithTokenInterceptor,
      multi: true,
    },
    {
      provide: MatPaginatorIntl,
      useClass: RussianMatPaginatorIntl,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (
        toolbarService: ToolbarService,
        userSessionService: UserSessionService,
      ) => () => initApp(toolbarService, userSessionService),
      multi: true,
      deps: [ToolbarService, UserSessionService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

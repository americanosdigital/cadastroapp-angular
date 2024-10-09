import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    AppRoutingModule,
    provideRouter(routes),  // Aqui você fornece as rotas para o roteamento
    importProvidersFrom(HttpClientModule)  // Forneça o HttpClientModule aqui
  ]
}).catch(err => console.error(err));

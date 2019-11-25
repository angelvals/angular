import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatInputModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSliderModule,
  MatButtonModule,
  MatDividerModule,
  MatCardModule,
  MatSnackBarModule,
  MatSpinner
} from '@angular/material';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HeaderComponent } from './components/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from 'src/environments/environment';
import { ProgressComponent } from './components/progress/progress.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { LoginComponent } from './pages/login/login.component';
import { TokenInterceptorProvider } from './services/token-interceptor/token-interceptor.provider';
import { LoadingInterceptorProvider } from './services/loading-interceptor/loading-interceptor.provider';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    HeaderComponent,
    ProgressComponent,
    MatSpinner,
    DynamicFormComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatSnackBarModule,
    NgxsRouterPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsModule.forRoot([

    ], { developmentMode: !environment.production }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorProvider,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorProvider,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

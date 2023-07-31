import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';


import { AppComponent } from './app.component';
import { InserimentoPersonaComponent } from './inserimento Persona/inserimento-persona.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UtentiComponent } from './utenti/utenti.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './service/login.service';
import { BodyClickService } from './service/header.service';
import { PraticaComponent } from './pratica/pratica.component';
import { RecuperoPassComponent } from './recupero-pass/recupero-pass.component';
import { VetturaComponent } from './vettura/vettura.component';
import { PraticaTabComponent } from './pratica-tab/pratica-tab.component';
import { ArchivioComponent } from './archivio/archivio.component';
import { UtenteViewComponent } from './utente-view/utente-view.component';
import { PraticaTabUtenteComponent } from './pratica-tab-utente/pratica-tab-utente.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';
import { ArchivioUtenteComponent } from './archivio-utente/archivio-utente.component';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    AppComponent,
    InserimentoPersonaComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    UtentiComponent,
    PraticaComponent,
    RecuperoPassComponent,
    VetturaComponent,
    PraticaTabComponent,
    ArchivioComponent,
    UtenteViewComponent,
    PraticaTabUtenteComponent,
    AdminViewComponent,
    PopupDialogComponent,
    ArchivioUtenteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressBarModule,
    ToastrModule.forRoot({
      positionClass: "toastr-center",
      timeOut: 3000,
      preventDuplicates: true,
    }),
    GoogleMapsModule
  ],
  providers: [AuthService, BodyClickService,AuthGuard,provideAnimations(),provideToastr()],
  bootstrap: [AppComponent]
})
export class AppModule { }

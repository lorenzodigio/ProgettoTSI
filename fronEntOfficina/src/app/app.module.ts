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

import { AppComponent } from './app.component';
import { InserimentoPersonaComponent } from './inserimento Persona/inserimento-persona.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UtentiComponent } from './utenti/utenti.component';
import { AuthGuard } from './auth-guard.service';

import { AuthService } from './login/login.service';
import { BodyClickService } from './header/header.service';
import { PraticaComponent } from './pratica/pratica.component';
import { RecuperoPassComponent } from './recupero-pass/recupero-pass.component';
import { RecuperoService } from './recupero-pass/recuperoPass.service';
import { VetturaComponent } from './vettura/vettura.component';
import { PraticaTabComponent } from './pratica-tab/pratica-tab.component';
import { ArchivioComponent } from './archivio/archivio.component';
import { UtenteViewComponent } from './utente-view/utente-view.component';
import { PraticaTabUtenteComponent } from './pratica-tab-utente/pratica-tab-utente.component';
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
    PraticaTabUtenteComponent
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
    MatDividerModule
  ],
  providers: [AuthService, BodyClickService,RecuperoService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

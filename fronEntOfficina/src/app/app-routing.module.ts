import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InserimentoPersonaComponent } from './inserimento Persona/inserimento-persona.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UtentiComponent } from './utenti/utenti.component';
import { RecuperoPassComponent } from './recupero-pass/recupero-pass.component';
import { PraticaComponent } from './pratica/pratica.component';
import { PraticaTabComponent } from './pratica-tab/pratica-tab.component';
import { AuthGuard } from './auth-guard.service';
import { ArchivioComponent } from './archivio/archivio.component';
import { PraticaTabUtenteComponent } from './pratica-tab-utente/pratica-tab-utente.component';

const routes: Routes = [
  { path: '', redirectTo:'/login', pathMatch:'full' },
  { path: "login", component: LoginComponent },
  { path: "login/recuperoPassword", component: RecuperoPassComponent},
  { path: "admin/home/inserimentoPersona", component: InserimentoPersonaComponent,canActivate: [AuthGuard]},
  { path: "home", component:HomeComponent,canActivate: [AuthGuard] },
  { path: "admin/home", component:HomeComponent ,canActivate: [AuthGuard]},
  { path: "admin/home/utenti", component:UtentiComponent,canActivate: [AuthGuard] },
  { path: "admin/home/pratiche", component:PraticaTabComponent,canActivate: [AuthGuard]},
  { path: "admin/home/aggiungiPratica", component:PraticaComponent,canActivate: [AuthGuard]},
  {path: "admin/home/archivio", component:ArchivioComponent,canActivate: [AuthGuard]},
  {path:"home/pratiche", component:PraticaTabUtenteComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

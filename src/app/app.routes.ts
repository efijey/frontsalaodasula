import { Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';
import { LoginComponent } from './login/login.component';
import { CalendarioComponent } from './agenda/calendario/calendario.component';
import { MeusAgendamentosComponent } from './agendamentos/meus-agendamentos/meus-agendamentos.component';
import { ClientesComponent } from './clientes/clientes.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'agenda', component: CalendarioComponent, canActivate: [AuthGuard] },
  { path: 'agendamentos', component: MeusAgendamentosComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/agenda', pathMatch: 'full' },
  { path: '**', redirectTo: '/agenda' }
];

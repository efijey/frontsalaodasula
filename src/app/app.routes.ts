import { Routes } from '@angular/router';
import { MeusAgendamentosComponent } from './agendamentos/meus-agendamentos/meus-agendamentos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CalendarioComponent } from './agenda/calendario/calendario.component';

export const routes: Routes = [
    { path: 'meus-agendamentos', component: MeusAgendamentosComponent },
    { path: 'clientes', component: ClientesComponent},
    { path: 'agenda', component: CalendarioComponent}
];

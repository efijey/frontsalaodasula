import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cliente } from '../../model/Cliente';
import { Agendamento } from '../../model/Agendamento';
import { AgendamentoService } from '../../service/agendamento.service';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-modal-ver-cliente',
  imports: [CommonModule],
  templateUrl: './modal-ver-cliente.component.html',
  styleUrl: './modal-ver-cliente.component.css'
})
export class ModalVerClienteComponent {


  @Input() cliente!: Cliente;
  @Output() fechar = new EventEmitter<void>();

  agendamentos: Agendamento[] = [];

  constructor(
    private clienteService: ClienteService,
    private agendamentoService: AgendamentoService
  ) {}

  ngOnInit() {
    this.carregarAgendamentos();
  }


  private carregarAgendamentos() {
    this.agendamentoService.listarAgendamentosPorCliente(this.cliente.id).subscribe((agendamentos: Agendamento[]) => {
      this.agendamentos = agendamentos.filter(agendamento => agendamento.cliente.id === this.cliente.id);
    });

  }

  fecharModal(): void {
    this.fechar.emit();
  }

}

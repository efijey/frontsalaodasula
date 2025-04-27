import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Agendamento } from '../../model/Agendamento';
import { Cliente } from '../../model/Cliente';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-modal-agendamento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-agendamento.component.html',
  styleUrl: './modal-agendamento.component.css'
})
export class ModalAgendamentoComponent {
@Input() agendamento:Agendamento | null = null;
@Input() agendamentoSelecionado!:Agendamento;
@Input() dataInicio?: Date;
@Input() dataFim?: Date;
@Output() fechar = new EventEmitter<void>();
@Output() salvar = new EventEmitter<Agendamento>();

AgendamentoForm!: FormGroup;
clientes: Cliente[] = [];
isEdit = false;
isCalendarSelection = false;
teste!: Agendamento;

constructor(
  private fb: FormBuilder,
  private clienteService: ClienteService
) { }


ngOnInit(): void {
  this.teste = this.agendamentoSelecionado;
  this.carregarClientes();
  this.inicializarFormulario();

}

carregarClientes(): void {
  this.clienteService.selecionarTodosClientes().subscribe(
    (clientes: Cliente[]) => {
      this.clientes = clientes;
    },
    (error) => {
      console.error('Erro ao carregar clientes:', error);
    }
  );
}


ngOnChanges(changes: SimpleChanges): void {
  if (changes['agendamento'] || changes['dataInicio'] || changes['dataFim']){
      if (!this.AgendamentoForm) {
          this.inicializarFormulario();
      } else{
        if (this.agendamento) {
          this.isEdit = true;
          this.isCalendarSelection = false;
          this.AgendamentoForm.patchValue(this.agendamento || {});
        } else if (this.dataInicio && this.dataFim) {
          this.isEdit = false;
          this.isCalendarSelection = true;
          this.AgendamentoForm.patchValue({
            dataInicio: this.dataInicio,
            dataFim: this.dataFim
          });
        }

      }
  }
}

inicializarFormulario(): void {
  this.AgendamentoForm = this.fb.group({
    dataInicio: [this.agendamento?.dataInicio ? this.agendamento?.dataInicio : this.dataInicio, Validators.required],
    dataFim: [this.dataFim || this.agendamento?.dataFim || '', Validators.required],
    cliente: [this.agendamento?.cliente?.id || '', Validators.required],
    servico: [this.agendamento?.servico || '', Validators.required],
    valor: [this.agendamento?.valor || '', Validators.required],
    status: [this.agendamento?.status || '', Validators.required]
  });

  if (this.isCalendarSelection) {
    this.AgendamentoForm.get('dataInicio')?.disable();
    this.AgendamentoForm.get('dataFim')?.disable();
  }
}




fecharModal(): void {
  this.fechar.emit();
}

salvarAgendamento(): void {
  if (this.AgendamentoForm.valid) {
    const formValue = this.AgendamentoForm.getRawValue();
    
    // Find the selected cliente object from the clientes array
    const clienteSelecionado = this.clientes.find(c => c.id === Number(formValue.cliente));
    
    const novoOuEditadoAgendamento: Agendamento = {
      id: this.agendamento?.id || null,
      ...formValue,
      cliente: clienteSelecionado // Replace the ID with the actual cliente object
    };
    
    this.salvar.emit(novoOuEditadoAgendamento);
  }
}
}

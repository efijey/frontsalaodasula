import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../../model/Cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.css']
})
export class ModalClienteComponent implements OnInit, OnChanges {
  @Input() cliente: Cliente | null = null;  // Se for null, significa que estamos cadastrando um novo cliente
  @Output() fechar = new EventEmitter<void>();  // Emite evento para fechar a modal
  @Output() salvar = new EventEmitter<Cliente>();  // Emite evento para salvar ou editar

  clienteForm!: FormGroup;
  isEdit = false;  // Flag para identificar se é edição ou criação

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente']) {
        if (!this.clienteForm) {
            this.inicializarFormulario();
        } else {
            this.clienteForm.patchValue(this.cliente || {});
        }
    }
  }

  inicializarFormulario(): void {
      this.clienteForm = this.fb.group({
          nome: [this.cliente?.nome || '', Validators.required],
          telefone: [this.cliente?.telefone || '', Validators.required],
          dataNascimento: [this.cliente?.dataNascimento || '', Validators.required],
          sexo: [this.cliente?.sexo || '']
      });
    }

  fecharModal(): void {
    this.fechar.emit();
  }

  salvarCliente(): void {
    const novoOuEditadoCliente: Cliente = {
        id: this.cliente?.id || 0,
        ...this.clienteForm.value
    };
    this.salvar.emit(novoOuEditadoCliente);
  }
}
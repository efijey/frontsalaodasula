import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/Cliente';
import { ClienteService } from '../service/cliente.service';
import { CommonModule } from '@angular/common';
import { ModalClienteComponent } from "./modal-cliente/modal-cliente.component";
import { ModalVerClienteComponent } from "./modal-ver-cliente/modal-ver-cliente.component";

@Component({
  selector: 'app-clientes',
  imports: [FormsModule, CommonModule, ModalClienteComponent, ModalVerClienteComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit{


  //json de clientes
  clientes:Cliente[] = [];

  clienteSelecionado: Cliente | null = null;

  modalAberta = false;

  modalDetalhesAberta = false;

  clienteSelecionadoDetalhes: Cliente| null = null;

  filtroNome: string = '';

  //construtor
  constructor(private clienteService:ClienteService){}

   //método de inicialização
   ngOnInit(){
    this.selecionarClientes();
  }

  //método de selecionar clientes para a lista
  selecionarClientes():void{
    this.clienteService.selecionarTodosClientes().subscribe((clientes:Cliente[])=>{ 
      this.clientes = clientes.sort((a, b) => a.nome.localeCompare(b.nome));
    });
  }

  abrirModal(cliente?: Cliente):void{
    this.clienteSelecionado = cliente ? { ...cliente} : null;
    this.modalAberta = true;
  }

  fecharModal():void{
    this.modalAberta = false;
    this.clienteSelecionado = null;
  }


  //criar ou editar cliente
  salvarCliente(cliente:Cliente):void{
    if(cliente.id){
      this.clienteService.editarCliente(cliente.id, cliente).subscribe((cliente:Cliente)=>{
        this.selecionarClientes();
      });
    }else{
      this.clienteService.cadastrarCliente(cliente).subscribe((cliente:Cliente)=>{
        this.selecionarClientes();
      });
    }
    this.fecharModal();
  }

  //deletar cliente
  deletarCliente(id:number):void{
    console.log("chamando");
    this.clienteService.deletarCliente(id).subscribe({
      next: () => {
        // Remove from array
        this.clientes = this.clientes.filter(cliente => cliente.id !== id);
      }
    })
    console.log("chamou");
  }

//modal de ver clientes

abrirModalDetalhes(cliente: Cliente): void {
  this.clienteSelecionadoDetalhes = cliente;
  this.modalDetalhesAberta = true;
}

fecharModalDetalhes() {
  this.modalDetalhesAberta = false;
  this.clienteSelecionadoDetalhes = null;

}



}

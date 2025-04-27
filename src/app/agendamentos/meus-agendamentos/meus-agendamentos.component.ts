import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Agendamento } from '../../model/Agendamento';
import { AgendamentoService } from '../../service/agendamento.service';
import { FormsModule } from '@angular/forms';
import { ModalAgendamentoComponent } from '../modal-agendamento/modal-agendamento.component';

@Component({
  selector: 'app-meus-agendamentos',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalAgendamentoComponent],
  templateUrl: './meus-agendamentos.component.html',
  styles: ``
})
export class MeusAgendamentosComponent implements OnInit{

  agendamentos:Agendamento[] = [];

  agendamento:Agendamento | null = null;

  constructor (private agendamentoService:AgendamentoService){}

  ngOnInit(){
    this.listarAgendamentos();
  }

  listarAgendamentos():void{
    this.agendamentoService.listarAgendamentos().subscribe((agendamentos:Agendamento[])=>{
      this.agendamentos = agendamentos;
    }); //estudar usar o endpoint que já ordena por data inicio no backend

  }

  //modal

  modalAberto: boolean = false;

  abrirModal(agendamento?: Agendamento): void {
    this.agendamento = agendamento ? { ...agendamento} : null;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.agendamento = null;
  }


  salvarAgendamento(agendamento: Agendamento):void{
    if(agendamento.id){
      this.agendamentoService.editarAgendamento(agendamento.id, agendamento).subscribe((agendamento:Agendamento)=>{
        this.listarAgendamentos();
      });
    }else{
      this.agendamentoService.criarAgendamento(agendamento).subscribe((agendamento:Agendamento)=>{
        this.listarAgendamentos();
      });
    }
    this.fecharModal();
  }

  deletarAgendamento(id:number):void{
    this.agendamentoService.deletarAgendamento(id).subscribe((agendamento:Agendamento)=>{
      this.listarAgendamentos();
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../model/Agendamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  //url da api
  private url:string = 'http://localhost:8080'

  constructor(private http:HttpClient) { }

  //selecionar ultimo agendamento do cliente
  selecionarUltimoAgendamentoCliente(id:number){
    return this.http.get(`${this.url}/agendamento/buscar-ultimo-agendamento-cliente/${id}` );
  }

  listarAgendamentos():Observable<Agendamento[]>{
    return this.http.get<Agendamento[]>(`${this.url}/agendamento/listar-todos`);
  }

  listarAgendamentosPorCliente(clienteId:number):Observable<Agendamento[]>{
    return this.http.get<Agendamento[]>(`${this.url}/agendamento/listar-por-cliente/${clienteId}`);
  }

  criarAgendamento(agendamento:Agendamento):Observable<Agendamento>{
    return this.http.post<Agendamento>(`${this.url}/agendamento/criar`, agendamento);
  }

  concluirAgendamento(id:number):Observable<Agendamento>{
    return this.http.put<Agendamento>(`${this.url}/agendamento/concluir/${id}`, null);
  }

  cancelarAgendamento(id:number):Observable<Agendamento>{
    return this.http.put<Agendamento>(`${this.url}/agendamento/cancelar/${id}`, null);
  }

  editarAgendamento(id:number, agendamento:Agendamento):Observable<Agendamento>{
    return this.http.put<Agendamento>(`${this.url}/agendamento/editar/${id}`, agendamento);
  }

  deletarAgendamento(id:number):Observable<Agendamento>{
    return this.http.delete<Agendamento>(`${this.url}/agendamento/deletar/${id}`);
  }
}

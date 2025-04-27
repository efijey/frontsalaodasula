import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //url da api
  private url:string = 'http://localhost:8080'

  constructor(private http:HttpClient) { }

  //selecionar todos os clientes
  selecionarTodosClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url + '/cliente/');
  }

  //selecionar o cliente por id
  selecionarClientePorId(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/cliente/${id}`);
  }

  //cadastrar cliente
  cadastrarCliente(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(`${this.url}/cliente/`, cliente);
  }

  //editar cliente
  editarCliente(id: number, cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.url}/cliente/${id}`, cliente);
  }

  //deletar cliente
  deletarCliente(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.url}/cliente/${id}`);
  }


}

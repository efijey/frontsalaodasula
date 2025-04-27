import { Cliente } from "./Cliente";

export class Agendamento{

    id: number = 0;
    dataInicio: Date = new Date();
    dataFim: Date = new Date();
    servico: string = '';
    valor: number = 0;
    cliente: Cliente = new Cliente();
    status: string = '';

}
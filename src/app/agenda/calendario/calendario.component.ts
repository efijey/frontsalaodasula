import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AgendamentoService } from '../../service/agendamento.service';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { ModalAgendamentoComponent } from "../../agendamentos/modal-agendamento/modal-agendamento.component";
import { Agendamento } from '../../model/Agendamento';
import { Cliente } from '../../model/Cliente';


@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, ModalAgendamentoComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent implements OnInit{

  modalAberto: boolean = false;

  agendamentoSelecionado: Agendamento | null = null;
  
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    locale: ptBrLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    buttonText:{
      today:    'Hoje',
      month:    'Mês',
      week:     'Semana',
      day:      'Dia',
      list:     'Lista'
    },
    slotMinTime: '06:00:00',
    slotMaxTime: '23:00:00',
    allDaySlot: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: [],
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }
  };

  constructor(private agendamentoService: AgendamentoService) {}
  
  ngOnInit() {
    this.carregarAgendamentos();
  }

  private carregarAgendamentos() {
    this.agendamentoService.listarAgendamentos().subscribe({
      next: (agendamentos) => {
        const eventos = agendamentos.map(agendamento => ({
          id: agendamento.id.toString(),
          title: `${agendamento.cliente.nome} - ${agendamento.servico}`,
          start: agendamento.dataInicio,
          end: agendamento.dataFim,
          backgroundColor: this.getEventColor(agendamento.status),
          extendedProps: {
            cliente: agendamento.cliente,
            servico: agendamento.servico,
            status: agendamento.status,
            dataInicio: agendamento.dataInicio,
            dataFim: agendamento.dataFim,
            valor: agendamento.valor
          }
        }));
        this.calendarOptions.events = eventos;
      },
    });
  }

  handleDateSelect(selectInfo: any) {

    const start: Date = selectInfo.start;
    const end: Date = selectInfo.end;
    
    this.agendamentoSelecionado = {
      id: 0,
      dataInicio: start,
      dataFim: end,
      cliente: {} as Cliente,
      servico: '',
      valor: 0,
      status: ''
    } as Agendamento;
  
    this.modalAberto = true;

  // // Clear the date selection
  //   const calendarApi = selectInfo.view.calendar;
  //   calendarApi.unselect();
}
  
  handleEventClick(clickInfo: any) {
    this.agendamentoSelecionado = {
      id: clickInfo.event.id,
      dataInicio: clickInfo.event.extendedProps.dataInicio,
      dataFim: clickInfo.event.extendedProps.dataFim,
      cliente: clickInfo.event.extendedProps.cliente,
      servico: clickInfo.event.extendedProps.servico,
      valor: clickInfo.event.extendedProps.valor,
      status: clickInfo.event.extendedProps.status
    };
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.agendamentoSelecionado = null;
  }

  salvarAgendamento(agendamento: Agendamento):void{
    if (agendamento.id) {
    this.agendamentoService.editarAgendamento(agendamento.id, agendamento).subscribe({
      next: (novoAgendamento: Agendamento) => {
        // Refresh calendar events after creating new appointment
        this.carregarAgendamentos();
        this.fecharModal();
      },
      error: (error) => {
        console.error('Error creating appointment:', error);
        // Handle error - maybe show an error message
      }
    });
  }
    else {
      this.agendamentoService.criarAgendamento(agendamento).subscribe({
        next: (novoAgendamento) => {
          // Refresh calendar events after creating new appointment
          this.carregarAgendamentos();
          this.fecharModal();
        },
        error: (error) => {
          console.error('Error creating appointment:', error);
          // Handle error - maybe show an error message
        }
      });
    }
  }
  

  private getEventColor(status: string): string {
    switch(status?.toUpperCase()) {
      case 'CONCLUIDO':
        return '#2ecc71';
      case 'ABERTO':
        return '#f1c40f';
      case 'CANCELADO':
        return '#e74c3c';
      default:
        return '#3498db';
    }
  }

  //modal

  // novoAgendamento: Agendamento = {} as Agendamento;
  
  //   abrirModal(dataInicio: Date, dataFim: Date): void {
  //     this.novoAgendamento = {
  //       id: 0,
  //       dataInicio: dataInicio,
  //       dataFim: dataFim,
  //       cliente: {} as Cliente,
  //       servico: '',
  //       valor: 0,
  //       status: ''
  //     } as Agendamento;
  //     this.modalAberto = true;
  //   }
  
  //   fecharModal(): void {
  //     this.modalAberto = false;
  //     this.novoAgendamento = {} as Agendamento;
  //   }
  
  
    
}


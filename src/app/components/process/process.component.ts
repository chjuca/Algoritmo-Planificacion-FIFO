import { ProcessService } from './../../services/process.service';
import { Process } from './../../interfaces/process.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  process = {} as Process;
  process0 = {} as Process;
  avgTE: string;
  avgTR: string;
  processList = [];
  processListGraph = [];


  // Bandera para mostrar la tabla de resultados;
  is_clicked = false;


  constructor(public processService: ProcessService) { }

  ngOnInit() {
    this.processList = this.processService.getProcess();
  }

  // Metodo para agregar un proceso a la lista
  addProcess(process: Process) {
    this.processService.addProcess(process);
  }

  // Metodo para aplicar el algoritmo FIFO a la lista de Objetos
  fifo() {
    this.processService.fifo();
    this.process0 = this.processList[0];
    this.avgTE = this.processService.avgTE().toFixed(2);
    this.avgTR = this.processService.avgTR().toFixed(2);
    this.processListGraph = this.processService.processGraph();
    this.is_clicked = true;         // Cambiamos de valor a la bandera para que presente la tabla de resultados
  }


}

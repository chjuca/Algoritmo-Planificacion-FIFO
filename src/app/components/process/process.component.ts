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


  is_clicked = false; // Bandera para mostrar la tabla de resultados;
  is_empty = true; // Bandera para ocultar botones, grafica y tabla de resultados;
 

  constructor(public processService: ProcessService) { }

  ngOnInit() {
    this.processList = this.processService.getProcess();
  }

  // Metodo para agregar un proceso a la lista
  addProcess(process: Process) {
    this.processService.addProcess(process);
    if(this.is_clicked) {
      this.fifo();
    }
    this.is_empty = false;
  }

  // Metodo para eliminar un proceso de la lista
  deleteProcess(process: Process){
    this.processService.deleteProcess(process);
    if(this.is_clicked){
      this.fifo();
    }
    if(this.processList.length == 0){
      this.is_empty = true;
    }
  }

  /*
  validateRepeatedProcess(name: string): boolean{
    var val = false;
    for (let index_process = 0; index_process < this.processList.length; index_process++) {
      if(name == this.processList[index_process].name){
        val = true;
      }
    }
    console.log(val);
    return val;
  }
  */
  /*
  validateIsInteger(process:Process){
    var r = false;
    if (isNumber(process.cpuBurst)){
       r = true;
    }
    return r;
  }
  */

  validateCpuBurst(process: Process): boolean{
    var bol = false
    if (process.cpuBurst < 1){
      bol = true;
    }
    return bol;
  }

  validateArrivalTime(process: Process): boolean{
    var bol = false
    if (process.arrivalTime < 0){
      bol = true;
    }
    return bol;
  }

  // Metodo para aplicar el algoritmo FIFO a la lista de Objetos
  fifo() {

    if(this.processList.length == 0){
      this.is_empty = true;
    }else{
      this.processService.fifo();
      this.process0 = this.processList[0];
      this.avgTE = this.processService.avgTE().toFixed(2);
      this.avgTR = this.processService.avgTR().toFixed(2);
      this.processListGraph = this.processService.processGraph()
      this.is_clicked = true; // Cambiamos de valor a la bandera para que presente la tabla de resultados
    }
  }

  // Metodo para resetear el algoritmo
  resetFifo(){
    this.processService.resetFifo();
    this.is_clicked = false;
    this.is_empty = true;
  }

}

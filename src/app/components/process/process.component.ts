import { Process } from './../../interfaces/process.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  process = {} as Process;
  // processList = [ {name: 'P1', cpuBurst: 3 , arrivalTime: 3, standbyTime : 0, returnTime: 0},
  //                 {name: 'P2', cpuBurst: 4 , arrivalTime: 1},
  //                 {name: 'P3', cpuBurst: 2 , arrivalTime: 5}
  //               ];

  processList = [ {name: 'P1', cpuBurst: 3 , arrivalTime: 2, standbyTime : 0, returnTime: 0},
                  {name: 'P2', cpuBurst: 1 , arrivalTime: 4},
                  {name: 'P3', cpuBurst: 3 , arrivalTime: 0},
                  {name: 'P4', cpuBurst: 4 , arrivalTime: 1},
                  {name: 'P5', cpuBurst: 2 , arrivalTime: 3}
];
  // processList = [];
  is_clicked = false;


  constructor() { }

  ngOnInit() {
  }

  // Metodo para agregar un proceso al arreglo
  addProcess(process: Process) {
    this.processList.push({name: process.name, cpuBurst: process.cpuBurst, arrivalTime: process.arrivalTime,
      standbyTime: process.standbyTime, returnTime :  process.returnTime});
  }

  // Metodo para ordenar la Lista por tiempo de llegada asc*
  sortListbyArivalTime() {
    this.processList.sort((a, b) => a.arrivalTime - b.arrivalTime);
  }
  sortListbyName() {
    this.processList.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Metodo para aplicar el algoritmo FIFO al array de Objetos
  fifo() {
    this.sortListbyArivalTime();
    this.processList[0].standbyTime = 0;
    for ( let i = 0; i < this.processList.length; i++) {
      this.processList[i].standbyTime = 0;
      for ( let j = i - 1; j >= 0; j--) {
        this.processList[i].standbyTime += this.processList[j].cpuBurst;
      }
      this.processList[i].returnTime = this.processList[i].standbyTime + this.processList[i].cpuBurst + this.processList[0].arrivalTime;
      this.processList[i].standbyTime -= this.processList[i].arrivalTime;
      this.processList[i].standbyTime += this.processList[0].arrivalTime;
    }
    console.log(this.processList);
    this.sortListbyName()
    this.is_clicked = true;
  }


}

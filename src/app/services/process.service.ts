import { Injectable } from '@angular/core';
import { Process } from '../interfaces/process.interface';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

   // lista de Procesos para probar algoritmo con tiempo muerto no es necesario, sirve para probar codigo mas rapido

  // processList = [ {name: 'P1', cpuBurst: 3 , arrivalTime: 3, standbyTime : 0, returnTime: 0},
  //                 {name: 'P2', cpuBurst: 4 , arrivalTime: 1},
  //                 {name: 'P3', cpuBurst: 2 , arrivalTime: 5}
  //               ];

  // lista de Procesos para probar algoritmo sin tiempo muerto no es necesario, sirve para probar codigo mas rapido

  // processList = [ {name: 'P1', cpuBurst: 3 , arrivalTime: 2, , standbyTime : 0, returnTime: 0},
  //                 {name: 'P2', cpuBurst: 1 , arrivalTime: 4},
  //                 {name: 'P3', cpuBurst: 3 , arrivalTime: 0},
  //                 {name: 'P4', cpuBurst: 4 , arrivalTime: 1},
  //                 {name: 'P5', cpuBurst: 2 , arrivalTime: 3}
  //               ];
  processList = [];

  constructor() { }

    // Metodo para agregar un proceso a la lista
    addProcess(process: Process) {
      process.standbyTime = 0;
      process.returnTime = 0;
      this.processList.push({name: process.name, cpuBurst: process.cpuBurst, arrivalTime: process.arrivalTime});
    }

    getProcess(): Array<any> {
      return this.processList;
    }

    // Metodo para ordenar la Lista por tiempo de llegada asc*
    sortListbyArivalTime() {
      this.processList.sort((a, b) => a.arrivalTime - b.arrivalTime);
    }


    // Metodo para ordenar la Lista por nombre asc*
    sortListbyName() {
      this.processList.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Metodo para aplicar el algoritmo FIFO a la lista de Objetos
  fifo(): Array <any> {
    this.sortListbyArivalTime();                  // Ordenamos la lista por orden de llegada
    this.processList[0].standbyTime = 0;          // Asignamos al primer proceso que llego espera 0
    for ( let i = 0; i < this.processList.length; i++) {
      this.processList[i].standbyTime = 0;        // Asignamos al proceso valor inicial o
      for ( let j = i - 1; j >= 0; j--) {
        this.processList[i].standbyTime += this.processList[j].cpuBurst; // iteramos hasta calcular el valor de espera
      }

      // Agregamos el valor de la rafaga del primer proceso en llegar, en el caso que no llegue en el tiempo 0

      this.processList[i].returnTime = this.processList[i].standbyTime + this.processList[i].cpuBurst + this.processList[0].arrivalTime;
      this.processList[i].standbyTime -= this.processList[i].arrivalTime;
      this.processList[i].standbyTime += this.processList[0].arrivalTime;
    }
    // console.log(this.processList);  // presentamos la lista y los valores calculados
    this.sortListbyName();          // Ordenamos la lista por orden nombre
    return this.processList;
  }

}

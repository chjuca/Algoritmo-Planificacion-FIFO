import { Process } from './../interfaces/process.interface';
import { Injectable } from '@angular/core';
import { TEMPORARY_NAME } from '@angular/compiler/src/render3/view/util';
import { templateJitUrl } from '@angular/compiler';
import { isNull } from 'util';
import { NONE_TYPE, INT_TYPE } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  // lista de Procesos para probar algoritmo con tiempo muerto no es necesario, sirve para probar codigo mas rapido

  // processList = [ {name: 'P1', cpuBurst: 3 , arrivalTime: 3, standbyTime : 0, returnTime: 0},
  //                 {name: 'P2', cpuBurst: 4 , arrivalTime: 1, standbyTime : 0, returnTime: 0},
  //                 {name: 'P3', cpuBurst: 2 , arrivalTime: 5, standbyTime : 0, returnTime: 0}
  //               ];


  // processList = [
  //   { name: 'P1', cpuBurst: 1, arrivalTime: 0, standbyTime: 0, returnTime: 0 },
  //   { name: 'P2', cpuBurst: 1, arrivalTime: 1, standbyTime: 0, returnTime: 0 },
  //   { name: 'P3', cpuBurst: 1, arrivalTime: 5, standbyTime: 0, returnTime: 0 },
  //   { name: 'P4', cpuBurst: 1, arrivalTime: 12, standbyTime: 0, returnTime: 0 },
  //   { name: 'P4', cpuBurst: 1, arrivalTime: 12, standbyTime: 0, returnTime: 0 },
  //   { name: 'P5', cpuBurst: 1, arrivalTime: 15, standbyTime: 0, returnTime: 0 },
  // ];


  // lista de Procesos para probar algoritmo sin tiempo muerto no es necesario, sirve para probar codigo mas rapido

  // processList = [ {name: 'P1', cpuBurst: 3 , arrivalTime: 2, standbyTime : 0, returnTime: 0},
  //                 {name: 'P2', cpuBurst: 1 , arrivalTime: 4, standbyTime: 0, returnTime: 0},
  //                 {name: 'P3', cpuBurst: 3 , arrivalTime: 0, standbyTime: 0, returnTime: 0}, // este es 0
  //                 {name: 'P4', cpuBurst: 4 , arrivalTime: 1, standbyTime: 0, returnTime: 0},
  //                 {name: 'P5', cpuBurst: 2 , arrivalTime: 3, standbyTime: 0, returnTime: 0}
  //               ];


  processList = [];


  constructor() { }


    // Metodo para agregar un proceso a la lista
    addProcess(process: Process) {
      process.standbyTime = 0;
      process.returnTime = 0;
      // Establecer como tiempo de llegada 0 en caso de no haber ingresado nada en 'Tiempo de llegada'
      if(process.arrivalTime == undefined){
        process.arrivalTime = 0; 
      }
      this.processList.push({name: process.name, cpuBurst: process.cpuBurst, arrivalTime: process.arrivalTime,
        standbyTime: process.arrivalTime, returnTime: process.returnTime});
      
      process.name = null; // Limpiar caja de texto 'Nombre'
      process.cpuBurst = NaN; // Limpiar caja de texto 'Rafaga de CPU'
      process.arrivalTime = null; // Limpiar caja de texto 'Tiempo de llegada'
    
    }


    // Metodo para eliminar un proceso a la lista
    deleteProcess(process: Process) {
      var i = this.processList.indexOf(process);
      this.processList.splice(i, 1);
    }

    // Metodo para resetear el algoritmo
    resetFifo(){
      this.processList.splice(0,this.processList.length);
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

// //  Metodo para aplicar el algoritmo FIFO a la lista de Objetos
//   fifo(): Array<any> {
//     this.sortListbyArivalTime();                  // Ordenamos la lista por orden de llegada
//     this.processList[0].standbyTime = 0;          // Asignamos al primer proceso que llego espera 0
//     for (let i = 0; i < this.processList.length; i++) {
//       this.processList[i].standbyTime = 0;        // Asignamos al proceso valor inicial o
//       for (let j = i - 1; j >= 0; j--) {
//         this.processList[i].standbyTime += this.processList[j].cpuBurst; // iteramos hasta calcular el valor de espera
//       }

// //     Agregamos el valor de la rafaga del primer proceso en llegar, en el caso que no llegue en el tiempo 0

//       this.processList[i].returnTime = this.processList[i].standbyTime + this.processList[i].cpuBurst + this.processList[0].arrivalTime;
//       this.processList[i].standbyTime -= this.processList[i].arrivalTime;
//       this.processList[i].standbyTime += this.processList[0].arrivalTime;
//       if (this.processList[i].standbyTime < 0) {
//         this.processList[i].standbyTime = this.processList[i].arrivalTime;
//         this.processList[i].returnTime = this.processList[i].standbyTime + this.processList[i].cpuBurst;
//       }
//       if ( i > 0 && this.processList[i - 1].returnTime < this.processList[i].arrivalTime) {
//         this.processList[i].standbyTime = 0;
//       }
//     }
//     return this.processList;
//   }


  fifo(): Array<any> {
    this.sortListbyArivalTime();                  // Ordenamos la lista por orden de llegada
    this.processList[0].standbyTime = 0;          // Asignamos al primer proceso que llego espera 0
    this.processList[0].returnTime = this.processList[0].cpuBurst + this.processList[0].arrivalTime;
    for (let i = 1; i < this.processList.length; i++) {
      if(i > 0 && this.processList[i - 1].returnTime < this.processList[i].arrivalTime){
        this.processList[i].standbyTime = 0;
        this.processList[i].returnTime = this.processList[i].arrivalTime + this.processList[i].cpuBurst
      } else {
        this.processList[i].standbyTime = this.processList[i - 1].returnTime -  this.processList[i].arrivalTime
        this.processList[i].returnTime = this.processList[i - 1].returnTime + this.processList[i].cpuBurst
      }
    }
    return this.processList;
  }

  // Metodo para calcular el promedio del tiempo de Espera
  avgTE(): number {
    const te = [];
    for (const objProcess of this.processList) {
      te.push(objProcess.standbyTime);
    }
    const sum = te.reduce((previous, current) => current += previous);
    const avg = sum / this.processList.length;
    return avg;
  }

  // Metodo para calcular el promedio del tiempo de Respuesta
  avgTR(): number {
    const tr = [];
    for (const objProcess of this.processList) {
      tr.push(objProcess.returnTime);
    }
    const sum = tr.reduce((previous, current) => current += previous);
    const avg = sum / this.processList.length;
    return avg;
  }

  processGraph() {
    var processListGraph = [];
    let previousProcessReturn = 0;
    let previousProcessArrivalTime = 0;
    for (let process of this.processList) {
      if (process.arrivalTime <= previousProcessReturn) {
        processListGraph.push(process);
      } else {
        processListGraph.push({ name: '///', cpuBurst: 0, arrivalTime: 0, standbyTime: 0, returnTime: process.arrivalTime });
        processListGraph.push(process);
      }
      previousProcessReturn = process.returnTime;
      previousProcessArrivalTime = process.arrivalTime;
    }
    console.log(processListGraph);
    return processListGraph;
  }
}

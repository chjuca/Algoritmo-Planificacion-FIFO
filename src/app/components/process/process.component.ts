import { Process } from './../../interfaces/process.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  process = {} as Process;
  processList = [];


  constructor() { }

  ngOnInit() {
  }

  addProcess(procces: Process) {
    this.processList.push({name: procces.name, cpuBurst: procces.cpuBurst, arrivalTime: procces.arrivalTime});
    console.log(this.processList);
  }


}

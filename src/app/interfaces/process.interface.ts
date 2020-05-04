export interface Process {
    name: string;
    cpuBurst: number; // posible cambio de nombre
    arrivalTime: number; // posible cambio de nombre tmbn
    standbyTime?: number;  // posible cambio de nombre tmbn
    returnTime?: number; // posible cambio de nombre tmbn
}

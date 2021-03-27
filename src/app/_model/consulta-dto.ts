export class ConsultaDto {
    dni: string;
    nombreCompleto: string;

    constructor(dni: string, nombreCompleto: string){
        this.dni = dni
        this.nombreCompleto = nombreCompleto
    }

}

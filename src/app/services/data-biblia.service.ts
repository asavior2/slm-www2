import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataBibliaService {

  constructor() { }

  temporalT: any[] = new Array;

  getTextoImport(libro: number, capitulo: number) {
    this.temporalT = require('../../../public/libros/' + libro + '/' + libro + '-' + capitulo + '.json');
    return (JSON.parse(JSON.stringify(this.temporalT)));
  }
}

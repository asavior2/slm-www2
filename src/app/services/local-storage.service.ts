import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private store: { [key: string]: string } = {};

  constructor() { }

  setItem(key: string, data: any): void {
    this.store[key] = JSON.stringify(data);
  }

  getItem(key: string): any {
    const data = this.store[key];
    return data ? JSON.parse(data) : null;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }

}

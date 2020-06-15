import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = ['Intial Message'];

  add(message: string) {
    this.messages.unshift(message);
  }

  clear() {
    this.messages = [];
  }
  
  constructor() { }
}

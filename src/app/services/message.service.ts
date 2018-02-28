import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
 messages: JSON[] = [];

 add(message: JSON) {
   this.messages.push(message);
 }

 clear() {
   this.messages = [];
 }
}

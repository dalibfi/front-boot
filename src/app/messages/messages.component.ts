import { Component } from '@angular/core';
import { Message } from '../models/message.model';
import { ChatService } from '../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  messages: Message[] = [];
  userInput = '';

  constructor(private chatService: ChatService) { }

  send() {
    this.messages.push({ sender: 'USER', text: this.userInput });

    this.chatService.sendMessage(this.userInput)
      .subscribe(res => {
        const aiText = res.choices[0].message.content;
        this.messages.push({ sender: 'AI', text: aiText });
      });

    this.userInput = '';
  }
}

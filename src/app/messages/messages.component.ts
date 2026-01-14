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
  isSending = false;


  constructor(private chatService: ChatService) { }

  send() {
    if (!this.userInput.trim() || this.isSending) return;

    this.isSending = true;

    this.messages.push({ sender: 'USER', text: this.userInput });

    this.chatService.sendMessage(this.userInput)
      .subscribe({
        next: (res) => {
          this.messages.push({
            sender: 'AI',
            text: res.reply
          });
          this.isSending = false;
        },
        error: (err) => {
          console.error(err);
          this.messages.push({
            sender: 'AI',
            text: 'Erreur serveur'
          });
          this.isSending = false;
        }
      });

    this.userInput = '';
  }
}

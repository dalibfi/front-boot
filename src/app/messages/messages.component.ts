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
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages: Message[] = [];
  userInput = '';
  isSending = false;
  sessionId: string;

  constructor(private chatService: ChatService) {
    // Générer un sessionId unique pour cette conversation
    this.sessionId = crypto.randomUUID();
  }

  send() {
    if (!this.userInput.trim() || this.isSending) return;

    this.isSending = true;

    // Ajouter le message utilisateur à l'affichage
    this.messages.push({ sender: 'USER', text: this.userInput });

    // Envoyer le message + sessionId au backend
    this.chatService.sendMessage(this.userInput, this.sessionId)
      .subscribe({
        next: (res) => {
          // Ajouter la réponse AI à l'affichage
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

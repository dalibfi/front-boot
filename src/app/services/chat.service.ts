import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {

    private apiUrl = 'http://localhost:8080/api/chat';

    constructor(private http: HttpClient) { }

    // Ajouter sessionId au body
    sendMessage(message: string, sessionId: string): Observable<{ reply: string }> {
        return this.http.post<{ reply: string }>(this.apiUrl, { message, sessionId });
    }
}

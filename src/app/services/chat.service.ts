import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class ChatService {

    constructor(private http: HttpClient) { }

    sendMessage(message: string) {
        return this.http.post<any>(
            'http://localhost:8080/api/chat',
            { message }
        );
    }
}

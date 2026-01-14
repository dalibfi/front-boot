export interface Message {
    sender: 'USER' | 'AI';
    text: string;
    time?: string;

}


export interface MessageResponse {
    data: Message
}

export interface AllMessagesResponse {
    data: [Message]
}

export class Message {
    public name: string;
    public email: string;
    public phone: string;
    public message: string;

    constructor() { }

}
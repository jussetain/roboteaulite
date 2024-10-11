export default class HttpReponse {
    message?: string;
    data?: any;
    timestamp: Date;

    constructor({ message, data }: { message?: string, data?: any }) {
        this.message = message;
        this.data = data;
        this.timestamp = new Date();
    }
}

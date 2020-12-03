export default class Event{
    constructor({second, type, message}) {
        this.second = second;
        this.type = type;
        this.message = message;
    }

    execute() {
        console.log(`
            > At second ${this.second}: 
            ${JSON.stringify({type: this.type, message: this.message})}
        `)
    }
};
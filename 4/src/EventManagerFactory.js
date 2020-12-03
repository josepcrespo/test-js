import EventManager from './EventManager';
import Event from './Event';

export default class EventManagerFactory{
    static create(events, types) {
        const filteredEvents = events.filter((event) => 
            types.includes(event.type)).map((event) => new Event(event)
        );

        return new EventManager(filteredEvents);
    }
};
import Event from "./Event";

export default class EventManager {

    static TIMER_PERIOD = 1000; // milliseconds

    /**
     * 
     * @param {Event[]} events 
     */
    constructor(events) {
        this.events = events;
        this.timer = null;
    }

    get maxSecond() {
        return Math.max(...this.events.map((ev) => ev.second));
    }

    run() {
        if (this.events.length === 0) {
            return;
        }

        let tick = 0;
        const maxSecond = this.maxSecond;
        this.timer = setInterval(() => {
            this.eventProcess(tick);
            tick++;
            if (tick > maxSecond) {
                this.stop();
            }
        }, EventManager.TIMER_PERIOD);
    }

    stop() {
        this.timer && clearInterval(this.timer);
    }

    /**
     * 
     * @param {number} tick 
     */
    eventProcess(tick) {
        this.events
        .filter((ev) => ev.second === tick)
        .forEach((ev) => ev.execute());
    }
};
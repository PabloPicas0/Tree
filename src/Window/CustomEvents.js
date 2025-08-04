class CustomEvents {
  constructor() {
    this.listener = new EventTarget();
    this.events = {};
  }

  setEvent(newEvent) {
    this.events[newEvent] = new Event(newEvent);
    return this;
  }

  getEvent(eventName) {
    const event = this.events[eventName];

    if (!event) throw new Error("Event not found");

    return event;
  }

  deleteEvent(eventName) {
    const temp = this.events[eventName];
    delete this.events[eventName];
    return temp;
  }
}


export default CustomEvents
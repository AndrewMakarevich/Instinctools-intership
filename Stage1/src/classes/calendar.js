import Event from "./eventClass";
class Calendar {
  constructor() {
    this._events = []
  }
  getWeekFromDate(date) {
    const firstJan = new Date(date.getFullYear(), 0, 1);
    const numbOfDays = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
    const numOfWeeks = Math.ceil(numbOfDays / 7);
    return numOfWeeks;
  }
  addEvent(event) {
    if (event instanceof Event) {
      this._events.push(event);
    } else {
      throw 'Incorrect object tried to add to the calendar';
    }
  }
  deleteEvent(eventToDelete) {
    return this._events = this._events.filter((event) => JSON.stringify(event) !== JSON.stringify(eventToDelete));
  }
  getEventsByYear(from, to) {
    return this._events.filter((event) => event.date.getFullYear() >= from && event.date.getFullYear() <= to);
  }
  getEventsByMonth(from, to) {
    return this._events.filter((event) => event.date.getMonth() >= from && event.date.getMonth() <= to)
  }
  getEventsByWeek(from, to) {
    return this._events.filter((event) => this.getWeekFromDate(event.date) >= from && this.getWeekFromDate(event.date) <= to)
  }
  get events() {
    return this._events;
  }
}
export default Calendar;
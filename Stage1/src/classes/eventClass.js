
class Event {
  constructor(name, date, callback) {
    this.name = name,
      this.date = date,
      this.callback = callback,
      this.state = this.getDateDiff(date) < 0 ? 'overdue' : 'active',
      this.eventActivation = this.setEventActivation();
    this.eventActivation(date, callback);
  }
  getDateDiff(date) {
    return date.getTime() - Date.now();
  }
  setEventActivation() {
    let timeout;
    return function (date, callback) {
      const dateDiff = this.getDateDiff(date);
      if (dateDiff > 0) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          callback();
          return this.state = 'overdue';
        }, dateDiff);
      }
    }
  }
  changeEventDate(date) {
    if (!date instanceof Date) {
      throw 'Incorrect date param';
    }
    this.date = date;
    this.eventActivation(date, this.callback)
  }
  changeEventName(name) {
    this.name = name;
  }
  // deleteEvent() {
  //   return this = null;
  // }
}
export default Event;
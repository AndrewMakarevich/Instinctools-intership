const repEvents = new (function RepEventsAddon() {
  const repEventsCalendar = {
    events: [],

    initializeRepEventInterval(eventObj, dayOfTheWeek) {
      const currentDate = new Date();
      if (currentDate.getDay() === dayOfTheWeek) eventObj.callback();
      const nextDay = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
      const startOfTheNextDay = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate());

      eventObj._timeout = setTimeout(() => {
        if (currentDate.getDay() === dayOfTheWeek) eventObj.callback();
        eventObj._interval = setInterval(() => {
          if (currentDate.getDay() === dayOfTheWeek) eventObj.callback();
        }, 1000 * 60 * 60 * 24);
      }, startOfTheNextDay - currentDate);
    },

    createRepeatingEvent(name, dayOfTheWeek, callback) {
      const alreadyCreatedEvent = this.events.find((repEvent) => repEvent.id === name);
      if (alreadyCreatedEvent) {
        alreadyCreatedEvent.dayOfTheWeek = dayOfTheWeek;
        alreadyCreatedEvent.callback = callback;
        return;
      }
      const eventObj = {
        id: name,
        name,
        dayOfTheWeek,
        callback,
        _timeout: 0,
        _interval: 0
      };
      this.events.push(eventObj);
      this.initializeRepEventInterval(eventObj, dayOfTheWeek);
    },

    // getRepeatingEvent(name) {
    //   const foundedEvent = this.repEvents.find(repEvent => repEvent.id === name);
    //   if (foundedEvent) {
    //     return {
    //       event: this.getParsedEvent(this.getStringifiedEvent(foundedEvent)),

    //       changeRepEventName: (name) => {
    //         foundedEvent.name = name;
    //         return this.getParsedEvent(this.getStringifiedEvent(foundedEvent));
    //       },
    //       changeRepEventInterval: (dayOfTheWeek) => {
    //         if (dayOfTheWeek === foundedEvent.dayOfTheWeek) {
    //           return;
    //         }
    //         if (+dayOfTheWeek >= 0 && +dayOfTheWeek <= 6) {
    //           if (foundedEvent._timeout) clearTimeout(foundedEvent._timeout);
    //           if (foundedEvent._interval) clearInterval(foundedEvent._interval);
    //           this.initializeRepEventInterval(foundedEvent, dayOfTheWeek);
    //         }
    //       },
    //       deleteRepEvent: () => {
    //         if (foundedEvent._timeout) clearTimeout(foundedEvent._timeout);
    //         if (foundedEvent._interval) clearInterval(foundedEvent._interval);
    //         this.repEvents = this.repEvents.filter(event => event !== foundedEvent);
    //       }
    //     };
    //   }
    //   return null;
    // },

    // getAllRepeatingEvents() {
    //   return this.getParsedEvent(this.getStringifiedEvent(this.repEvents));
    // }
  };
  this.createEvent = function (name, dayOfTheWeek, callback) {
    return repEventsCalendar.createRepeatingEvent(name, dayOfTheWeek, callback);
  };
})();
Object.setPrototypeOf(repEvents, calendar);
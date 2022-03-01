(function RepEventsAddon() {
  const calendarPrototype = Object.getPrototypeOf(calendar);
  function initializeRepEventInterval(eventObj, dayOfTheWeek) {
    const currentDate = new Date();
    if (currentDate.getDay() === dayOfTheWeek) {
      eventObj.callback();
    };
    const nextDay = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
    const startOfTheNextDay = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate());

    eventObj._timeout = setTimeout(() => {
      if (currentDate.getDay() === dayOfTheWeek) eventObj.callback();
      eventObj._interval = setInterval(() => {
        if (currentDate.getDay() === dayOfTheWeek) eventObj.callback();
      }, 1000 * 60 * 60 * 24);
    }, startOfTheNextDay - currentDate);
  }
  calendarPrototype.events.forEach(eventItem => {
    if (eventItem.dayOfTheWeek >= 0 && eventItem.dayOfTheWeek <= 6) {
      initializeRepEventInterval(eventItem, eventItem.dayOfTheWeek);
    }
  });
  calendarPrototype.createRepEvent = function (name, dayOfTheWeek, callback) {
    const alreadyCreatedEvent = calendarPrototype.events.find((repEvent) => repEvent.id === name);
    if (alreadyCreatedEvent && alreadyCreatedEvent.dayOfTheWeek !== undefined) {
      alreadyCreatedEvent.dayOfTheWeek = dayOfTheWeek;
      alreadyCreatedEvent.callback = callback;
      initializeRepEventInterval(alreadyCreatedEvent, alreadyCreatedEvent.dayOfTheWeek);
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
    calendarPrototype.events.push(eventObj);
    initializeRepEventInterval(eventObj, dayOfTheWeek);
  };
  calendarPrototype.setNewRepEventInterval = function (eventName, dayOfTheWeek) {
    const foundedEvent = calendarPrototype.events.find(eventItem => eventItem.id === eventName);
    if (foundedEvent) {
      if (dayOfTheWeek === foundedEvent.dayOfTheWeek) {
        return;
      }
      if (+dayOfTheWeek >= 0 && +dayOfTheWeek <= 6) {
        clearTimeout(foundedEvent._timeout);
        clearInterval(foundedEvent._interval);
        foundedEvent.dayOfTheWeek = dayOfTheWeek;
        initializeRepEventInterval(foundedEvent, dayOfTheWeek);
      }
    }
  };
  // calendarPrototype.deleteRepEvent = function (eventName) {
  //   const foundedEvent = calendarPrototype.events.find(eventItem => eventItem.id === eventName);
  //   console.log('EVENT to delete', foundedEvent);
  //   if (foundedEvent._timeout) clearTimeout(foundedEvent._timeout);
  //   if (foundedEvent._interval) clearInterval(foundedEvent._interval);
  //   calendarPrototype.deleteEvent(foundedEvent);
  // };
})();
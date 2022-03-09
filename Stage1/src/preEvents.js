(function preEventsAddon() {
  const calendarPrototype = Object.getPrototypeOf(calendar);
  function setPreEventFunctionTimeout(foundedEvent, callback, timeout, timeBeforeExicute, type) {
    setTimeout(() => {
      if (!calendar.getEvent(foundedEvent.id)) {
        return;
      }
      callback();
      if (type && type === 'daily') {
        return setPreEventFunctionTimeout(foundedEvent, callback, 1000 * 60 * 60 * 24 - timeBeforeExicute);
      }
      return setPreEventFunctionTimeout(foundedEvent, callback, 1000 * 60 * 60 * 24 * 7 - timeBeforeExicute);
    }, timeout);
  }
  function setPreEventFunction(foundedEvent, timeBeforeExicute, callback) {
    if (!foundedEvent) {
      return;
    }
    if (foundedEvent.eventType !== 'repeat') {
      setTimeout(() => {
        if (calendar.getEvent(foundedEvent.id)) {
          callback();
        }
      }, foundedEvent.date.getTime() - Date.now() - timeBeforeExicute);
    } else {

      const currentDate = new Date();
      const nextDay = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
      const startOfTheNextDay = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate());
      const millisecondToTheNextDay = currentDate.getTime() - startOfTheNextDay;

      if (foundedEvent.date === 'daily') {
        callback();
        setPreEventFunctionTimeout(foundedEvent, callback, 1000 * 60 * 60 * 24 - millisecondToTheNextDay - timeBeforeExicute, timeBeforeExicute, 'daily');
        return;
      }

      if (new Date().getDay() === foundedEvent.date.getDay()) {
        callback();
        setPreEventFunctionTimeout(foundedEvent, callback, 1000 * 60 * 60 * 24 * 7 - millisecondToTheNextDay - timeBeforeExicute, timeBeforeExicute);
        return;
      }
      const daysBefore = Math.abs(currentDate.getDay() - foundedEvent.date.getDay());
      return setPreEventFunctionTimeout(
        callback,
        1000 * 60 * 60 * 24 * daysBefore - millisecondToTheNextDay - timeBeforeExicute,
        timeBeforeExicute);
    }
  }

  calendarPrototype.createPreEventFunction = function (eventName, timeBeforeExicute, callback) {
    if (eventName === 'all') {
      calendarPrototype.events.forEach(event => {
        setPreEventFunction(event, timeBeforeExicute, callback);
      });
      return;
    }
    const foundedEvent = calendarPrototype.events.find(eventItem => eventItem.id === eventName);
    setPreEventFunction(foundedEvent, timeBeforeExicute, callback);
  };
})();
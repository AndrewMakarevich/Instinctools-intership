(function RepEventsAddon(calendar) {

  calendar._events.forEach(eventItem => {
    if (eventItem.eventType === 'repeat') {
      initializeRepEventInterval(eventItem, eventItem.date);
    }
  });
  // recursive function to create execution delay for the repeat events
  function createRepEventTimeout(event, timeout, type) {
    event._timeout = setTimeout(() => {
      if (!calendar.getEvent(event.name)) {
        return;
      }
      event.callback();
      if (type && type === 'daily') {
        return createRepEventTimeout(event, 1000 * 60 * 60 * 24);
      }
      return createRepEventTimeout(event, 1000 * 60 * 60 * 24 * 7);
    }, timeout);
  }
  // initializtion of the repeat event
  function initializeRepEventInterval(eventObj, date) {
    const currentDate = new Date();
    const nextDay = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
    const startOfTheNextDay = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate());
    const millisecondsToTheNextDay = startOfTheNextDay - currentDate;


    if (date === 'daily') {
      eventObj.callback();
      createRepEventTimeout(eventObj, 1000 * 60 * 60 * 24 - millisecondsToTheNextDay, 'daily');
      return;
    }

    const dayOfTheWeek = date.getDay();
    const currentDayOfTheWeek = new Date().getDay();

    if (currentDate.getDay() === dayOfTheWeek) {
      eventObj.callback();
      createRepEventTimeout(eventObj, 1000 * 60 * 60 * 24 * 7 - millisecondsToTheNextDay);
      return;
    }
    createRepEventTimeout(eventObj, 1000 * 60 * 60 * 24 * (Math.abs(dayOfTheWeek - currentDayOfTheWeek)) - millisecondsToTheNextDay);
  }
  // creation of the repeat event
  calendar.createRepEvent = function (name, date, callback) {

    calendar.deleteEvent(name);

    const eventObj = {
      eventType: 'repeat',
      name,
      date,
      callback,
      _timeout: 0,
    };

    calendar._events.push(eventObj);
    initializeRepEventInterval(eventObj, date);
  };

  const changeExecutionTime = calendar.changeExecutionTime;
  calendar.changeExecutionTime = function (eventName, date) {
    const foundedEvent = calendar._events.find(event => event.name === eventName);
    if (!foundedEvent) {
      return;
    }
    if (foundedEvent.eventType === 'repeat') {
      clearTimeout(foundedEvent._timeout);
      foundedEvent.date = date;
      initializeRepEventInterval(foundedEvent, date);
    } else {
      changeExecutionTime(eventName, date);
    }
  };

})(calendar);
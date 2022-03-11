(function preEventsAddon(calendar) {

  // function, that recursevly setting timeouts for  pre-event function
  function setPreEventFunctionTimeout(event, callback, timeout, timeBeforeExecute, type) {

    const preEventTimeout = setTimeout(() => {

      if (!calendar.getEvent(event.name)) {
        return;
      }

      callback();

      if (type && type === 'daily') {
        return setPreEventFunctionTimeout(event, callback, 1000 * 60 * 60 * 24 - timeBeforeExecute, 'daily');
      }

      return setPreEventFunctionTimeout(event, callback, 1000 * 60 * 60 * 24 * 7 - timeBeforeExecute);

    }, timeout);

    event.preEventFuncTimeout = {
      timeBeforeExecute,
      timeout: preEventTimeout,
      callback
    };

  }

  //setting pre-event function 
  function setPreEventFunction(event, timeBeforeExecute, callback) {
    // Setting pre-event function for the standart event
    if (event.eventType !== 'repeat') {

      if (event.date.getTime() - Date.now() < 0) {
        return;
      }

      event.preEventFuncTimeout = setTimeout(() => {

        if (calendar.getEvent(event.name)) {
          callback();
        }

      }, event.date.getTime() - Date.now() - timeBeforeExecute);
    } else {
      // Setting pre-event function for the repeat event
      const currentDate = new Date();
      const nextDay = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
      const startOfTheNextDay = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate());
      const millisecondToTheNextDay = currentDate.getTime() - startOfTheNextDay;
      // ... for daily event
      if (event.date === 'daily') {
        setPreEventFunctionTimeout(event, callback, 1000 * 60 * 60 * 24 - millisecondToTheNextDay - timeBeforeExecute, timeBeforeExecute, 'daily');
        return;
      }
      // ... for the repeat event wich execution day is today
      if (new Date().getDay() === event.date.getDay()) {
        setPreEventFunctionTimeout(event, callback, 1000 * 60 * 60 * 24 * 7 - millisecondToTheNextDay - timeBeforeExecute, timeBeforeExecute);
        return;
      }
      // ... for the repeat event wich execution day will be
      const daysBefore = Math.abs(currentDate.getDay() - event.date.getDay());

      return setPreEventFunctionTimeout(
        event,
        callback,
        1000 * 60 * 60 * 24 * daysBefore - millisecondToTheNextDay - timeBeforeExecute,
        timeBeforeExecute);
    }
  }

  calendar.createPreEventFunction = function (eventName, timeBeforeExecute, callback) {

    if (eventName === 'all') {

      calendar._events.array.forEach(event => {
        setPreEventFunction(event, timeBeforeExecute, callback);
      });

      return;
    }

    const foundedEvent = calendar._events.array.find(eventItem => eventItem.name === eventName);

    setPreEventFunction(foundedEvent, timeBeforeExecute, callback);
  };

  // change execution function extension to dynamicly reset pre-event-function
  const changeExecutionTime = calendar.changeExecutionTime;

  calendar.changeExecutionTime = function (eventName, date) {
    changeExecutionTime(eventName, date);

    const foundedEvent = calendar._events.array.find(event => event.name === eventName);

    if (!foundedEvent) {
      return;
    }

    if (foundedEvent.eventType === 'repeat') {

      if (foundedEvent.preEventFuncTimeout) {
        clearTimeout(foundedEvent.preEventFuncTimeout.timeout);
        setPreEventFunction(
          foundedEvent,
          foundedEvent.preEventFuncTimeout.timeBeforeExecute,
          foundedEvent.preEventFuncTimeout.callback);
      }

    }
  };
})(calendar);
calendar.createEvent('Standart-event', new Date(2022, 2, 4, 19, 54, 59), () => { console.log('Standart event callback exicute'); });
calendar.createEvent('Event-to-delete', new Date(2022, 2, 4, 15, 22, 11), () => { console.log('One more event'); });
calendar.createRepEvent('Repeat-event', new Date(2022, 2, 6), () => { console.log('Repeat event callback exicute'); });

calendar.changeExicutionTime('Standart-event', new Date(2022, 2, 4, 15, 21, 59));
calendar.changeExicutionTime('Repeat-event', new Date(2022, 2, 5));
calendar.changeExicutionTime('Repeat-event', 'daily');

calendar.editEventName('Standart-event', 'Standart-event__changed');
calendar.editEventName('Repeat-event', 'Repeat-event__changed');

calendar.createPreEventFunction('all', 10000, () => console.log('Pre callback exicuted'));
console.log(calendar.getAllEvents());
console.log(calendar.dateFiltering.getEventsByYear(2022, 2022).getEventsByMonth(2, 2).getEventsByMonthDay(4, 6));



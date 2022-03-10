
calendar.createEvent('Standart-event', new Date(2022, 2, 10, 15, 02, 59), () => { console.log('Standart event callback execute'); });
calendar.createEvent('Event-to-delete', new Date(2022, 2, 10, 15, 03, 59), () => { console.log('One more event'); });
calendar.createRepEvent('Repeat-event', new Date(2022, 2, 12), () => { console.log('Repeat event callback execute'); });




calendar.changeExecutionTime('Repeat-event', 'daily');
calendar.changeExecutionTime('Standart-event', new Date(2022, 2, 10, 15, 14, 59));

calendar.createPreEventFunction('all', 10000, () => console.log('Pre callback executed'));

calendar.editEventName('Standart-event', 'Standart-event__changed');
// calendar.editEventName('Repeat-event', 'Repeat-event__changed');
calendar.deleteEvent('Event-to-delete');
console.log(calendar.getAllEvents());
// console.log(calendar.getEvent('Repeat-event'));
console.log(calendar.dateFiltering.getEventsByYear(2022, 2022).getEventsByMonth(2, 2).getEventsByMonthDay(9, 10));



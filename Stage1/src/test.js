
// function testFunc(a, b) {
//   console.log(a);
//   console.log(b);
// }
// console.log(calendar.getAllEvents());
calendar.createEvent('Test1', new Date(2022, 2, 3, 14, 40, 01), () => { console.log('Test it'); });
calendar.editEventName('Test1', 'Test2');
calendar.editEventName('Test1', 'Test3');
calendar.changeExicutionTime('Test1', new Date(2022, 2, 4, 12, 27, 59));
// calendar.deleteEvent('Test1');
console.log(calendar.getAllEvents());
calendar.createRepEvent('Rep', 'daily', () => console.log('Repeat function'));
calendar.editEventName('Rep', 'Rep1');
console.log(calendar.getAllEvents());
// calendar.changeExicutionTime('Rep', new Date(2022, 2, 3));
console.log(calendar.dateFiltering.getEventsByYear(2022).getEventsByMonth(2).getEventsByWeek(9).getEventsByWeekDay(5));

calendar.createPreEventFunction('all', 10000, () => console.log('Pre event function'));

// const timeout = setTimeout(() => console.log('hahaha'), 12345);


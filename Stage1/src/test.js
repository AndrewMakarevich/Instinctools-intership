
// function testFunc(a, b) {
//   console.log(a);
//   console.log(b);
// }
// console.log(calendar.getAllEvents());
// calendar.createEvent('Test1', new Date(2022, 1, 24, 14, 29, 59), () => { testFunc('EventTest', 'exicuted') });

// calendar.getEvent('Test1').changeExicutionTime(new Date(2022, 2, 1, 12, 19, 02));
// console.log(calendar.getEvent('Test1').editEventName('Test'));
// console.log(calendar.getEvent('Test1').deleteEvent());
// console.log(calendar.getEvent('Test1'));
// console.log(calendar.getEventsByYear(2022, 2023).getEventsByMonth(1, 1).getEventsByMonthDay(24, 27));
console.log(calendar.getAllEvents());
calendar.createRepEvent('Rep', 2, () => {
  console.log('Test it');
});
calendar.setNewRepEventInterval('Rep', 3);
console.log(calendar.getAllEvents());
calendar.deleteEvent('Rep');
console.log(calendar.getAllEvents());


// console.log(calendar.getEvent);

// console.log(calendar.repEvents.getAllRepeatingEvents());
// calendar.repEvents.getRepeatingEvent('Rep').changeRepEventName('Rep1');
// calendar.repEvents.getRepeatingEvent('Rep').changeRepEventInterval(2);
// console.log(calendar.repEvents.getRepeatingEvent('Rep'));

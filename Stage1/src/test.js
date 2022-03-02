
// function testFunc(a, b) {
//   console.log(a);
//   console.log(b);
// }
// console.log(calendar.getAllEvents());
calendar.createEvent('Test1', new Date(2022, 2, 3, 12, 52, 59), () => { console.log('Test it'); });
calendar.editEventName('Test1', 'Test2');
calendar.editEventName('Test1', 'Test3');
calendar.changeExicutionTime('Test1', new Date(2022, 2, 2, 14, 10, 59));
// calendar.deleteEvent('Test1');
console.log(calendar.getAllEvents());
calendar.createRepEvent('Rep', 3, () => console.log('Repeat function'));
calendar.changeExicutionTime('Rep', 'daily');
console.log(calendar.getAllEvents());

console.log(calendar.dateFiltering);


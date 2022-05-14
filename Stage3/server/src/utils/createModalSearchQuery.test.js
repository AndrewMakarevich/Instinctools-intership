const createModelSearchQuery = require('./createModelSearchQuery');

describe('Create model search query correct object parsing', () => {
  test('', () => {
    const testObject = {
      fullName: {
        firstName: 'Andrew',
        lastName: 'Makarevich',
      },
      birthdate: {
        date: {
          year: '2001|2002',
          month: '8|9',
        },
      },
    };

    const parsedObject = createModelSearchQuery(JSON.stringify(testObject));

    expect(parsedObject).toEqual({
      'birthdate.date.month': {
        $gte: '8',
        $lte: '9',
      },
      'birthdate.date.year': {
        $gte: '2001',
        $lte: '2002',
      },
      'fullName.firstName': {
        $options: 'gi',
        $regex: 'Andrew',
      },
      'fullName.lastName': {
        $options: 'gi',
        $regex: 'Makarevich',
      },
    });
  });
});

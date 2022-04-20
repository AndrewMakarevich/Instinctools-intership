import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import {
  renderWithAppRouter,
  renderWithReduxProvider,
} from '../../../test/helpers/renderWithRouterAndReduxProvider';
import GroupList from './groupList';
import GroupService from '../../../service/groupService';

jest.mock('../../../service/groupService');

let response;

beforeEach(() => {
  response = {
    data: {
      count: 3,
      rows: [
        {
          _id: '6241b1ad17692d26ffbd18ae',
          groupName: 'First-group',
          groupTitle: 'Thats-my-first-group',
          __v: 0,
        },
        {
          _id: '6241b1b517692d26ffbd18b3',
          groupName: 'Second-group',
          groupTitle: 'Thats-my-first-group',
          __v: 0,
        },
        {
          _id: '624581d8abeb4d8cbbb43c6b',
          groupName: 'Tenth-group',
          groupTitle: 'Thats-my-tenth-group',
          __v: 0,
        },
      ],
    },
  };
});

test('Correct group list rendering after recieve group list data', async () => {
  // const spyAxios = jest.spyOn(axios, 'get');
  // await spyAxios.mockImplementation(() => Promise.resolve(response));
  GroupService.getGroups.mockReturnValue(response);
  // axios.get.mockReturnValue(response);
  // console.log(mockAx);
  renderWithReduxProvider(<GroupList />, ['/groups']);
  // screen.debug();
  const groupsRows = await screen.findAllByTestId('group-row');

  expect(groupsRows.length).toBe(3);
});

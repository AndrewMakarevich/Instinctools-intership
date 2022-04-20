import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { renderWithRouter } from '../../../../test/helpers/renderWithRouterAndReduxProvider';
import SubmitGroupChangesBtn from './submitGroupChangesBtn';

const user = userEvent.setup();
// jest.mock('axios');

test('Send data to change', async () => {
  // axios.put.mockReturnValue({});
  // renderWithRouter(
  //   <SubmitGroupChangesBtn
  //     groupId={'6241b1ad17692d26ffbd18ae'}
  //     initialParams={{
  //       groupName: 'Second group',
  //       groupTitle: 'Thats-my-first-group',
  //     }}
  //     paramsToEditObj={{ groupName: 'Second group' }}
  //     actualizeGroupInfo={() => {}}
  //   />
  // );
  // user.click(screen.getByTestId('submit-group-changes-btn'));
});

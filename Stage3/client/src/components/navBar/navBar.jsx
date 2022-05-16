import React from 'react';
import { userPaths, groupPaths } from '../router/routes';

import {
  StyledLink,
  StyledLinksItem,
  StyledLinksList,
  StyledNavBar,
} from './styled';

const NavBar = () => (
  <StyledNavBar>
    <StyledLinksList>
      <StyledLinksItem>
        <StyledLink pathname='Users' to={userPaths.mainPath.path}>
          {userPaths.mainPath.name}
        </StyledLink>
      </StyledLinksItem>

      <StyledLinksItem>
        <StyledLink pathname='Groups' to={groupPaths.mainPath.path}>
          {groupPaths.mainPath.name}
        </StyledLink>
      </StyledLinksItem>
    </StyledLinksList>
  </StyledNavBar>
);

export default NavBar;

import styled from 'styled-components';
import MyLink from '../../UI/myLink/myLink';

export const StyledNavBar = styled.nav`
  background-color: var(--extra-dark);
`;

export const StyledLinksList = styled.ul`
  display: flex;
  list-style: none;
`;

export const StyledLinksItem = styled.li`
  height: 100%;
  padding: 12px 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--extra-light);
  }
`;

export const StyledLink = styled(MyLink).attrs((props) => ({
  'data-testid': `nav-bar-${props.pathname}-link`,
}))`
  ${StyledLinksItem}:hover & {
    color: var(--medium-dark);
  }
`;

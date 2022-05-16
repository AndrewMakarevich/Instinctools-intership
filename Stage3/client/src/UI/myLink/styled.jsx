import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MyStyledLink = styled(Link)`
  text-decoration: none;
  color: var(--extra-light);
  transition: color 0.2s;
  &:hover {
    color: var(--medium-light);
  }
`;

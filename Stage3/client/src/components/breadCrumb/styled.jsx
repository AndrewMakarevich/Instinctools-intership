import styled from 'styled-components';
import MyLink from '../../UI/myLink/myLink';

export const StyledCrumbWrapper = styled.article.attrs({
  'data-testid': 'bread-crumb',
})`
  padding: 15px 0;
  display: flex;
`;

export const StyledCrumbLinkItem = styled.div`
  position: relative;
  background-color: var(--medium-dark);
  padding: 3px 13px 3px 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--extra-dark);
  }

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    top: 0;
    right: 0px;
    box-sizing: border-box;
    border-top: 13px solid var(--medium-light);
    border-left: 9px solid transparent;
  }

  &::after {
    content: '';
    position: absolute;
    height: 100%;
    bottom: 0;
    right: 0;
    box-sizing: border-box;
    border-bottom: 13px solid var(--medium-light);
    border-left: 9px solid transparent;
  }
`;

export const StyledCrumbLink = styled(MyLink).attrs((props) => ({
  'data-testid': `crumb-${props.pathname}-link`,
}))`
  width: 0;
  height: 0;

  &:before {
    content: '';
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    box-sizing: border-box;
    border: 12px solid transparent;
    border-right: 0;
    border-left: 8px solid var(--medium-light);
  }
`;

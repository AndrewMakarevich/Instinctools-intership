import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 } from 'uuid';
import {
  StyledCrumbLink,
  StyledCrumbLinkItem,
  StyledCrumbWrapper,
} from './styled';

const BreadCrumb = () => {
  const history = useLocation();

  const paths = useMemo(() => {
    const pathsArr = [];

    history.pathname.split('/').reduce((prevV, curV) => {
      const path = `${prevV}/${curV}`;
      const uniqueId = v4();
      const name = curV.charAt(0).toUpperCase() + curV.slice(1, curV.length);

      pathsArr.push({ id: uniqueId, name, path });

      return path;
    });

    return pathsArr;
  }, [history]);

  return (
    <StyledCrumbWrapper>
      {paths.map(({ id, name, path }) => (
        <StyledCrumbLinkItem key={id}>
          <StyledCrumbLink pathname={name} to={path}>
            {name}
          </StyledCrumbLink>
        </StyledCrumbLinkItem>
      ))}
    </StyledCrumbWrapper>
  );
};

export default BreadCrumb;

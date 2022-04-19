import { useLocation } from 'react-router-dom';
import { v4 } from 'uuid';
import { useMemo } from 'react';
import crumbStyles from './breadCrumb.module.css';
import MyLink from '../../UI/myLink/myLink';

const BreadCrumb = () => {
  const history = useLocation();
  function createPaths() {
    const pathsArr = [];

    history.pathname.split('/').reduce((prevV, curV) => {
      const path = `${prevV}/${curV}`;
      const uniqueId = v4();
      const name = curV.charAt(0).toUpperCase() + curV.slice(1, curV.length);

      pathsArr.push({ id: uniqueId, name, path });

      return path;
    });

    return pathsArr;
  }

  const paths = useMemo(createPaths, [history]);

  return (
    <article className={crumbStyles['crumb-wrapper']} data-testid='bread-crumb'>
      {paths.map(({ id, name, path }) => (
        <div key={id} className={crumbStyles['crumb-link__item']}>
          <MyLink className={crumbStyles['crumb-link']} to={path}>
            {name}
          </MyLink>
        </div>
      ))}
    </article>
  );
};

export default BreadCrumb;

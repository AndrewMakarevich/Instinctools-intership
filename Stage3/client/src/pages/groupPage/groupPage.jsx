import { useParams } from 'react-router-dom';
// import pageStyles from './groupPage.module.css';

const GroupPage = () => {
  const { groupname } = useParams();
  return (
    <article>
      <p>
        {groupname}
        {' '}
        group page
      </p>
    </article>
  );
};

export default GroupPage;

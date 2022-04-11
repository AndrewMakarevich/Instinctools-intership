import { useParams } from 'react-router-dom';
// import pageStyles from './userPage.module.css';

const UserPage = () => {
  const { username } = useParams();

  return (
    <article>
      <p>{username} user page</p>
    </article>
  );
};

export default UserPage;

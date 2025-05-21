import { pageStyle } from 'app/page.style';
import { auth } from 'lib/auth';

const Home = async () => {
  const session = await auth();
  // eslint-disable-next-line no-console
  console.log(session);

  return (
    <div style={ pageStyle }>
      Main page with client menu for future
    </div>
  );
};

export default Home;

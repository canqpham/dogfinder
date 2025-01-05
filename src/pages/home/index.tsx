import { useGetBreed } from '@/api/breedCard/use-get-breeds';
import Layout from '@/components/layout';
import SwipeCard from '@/components/swipeCard';
import * as React from 'react';

const Home: React.FunctionComponent = () => {
  const { data } = useGetBreed();
  return (
    <Layout>
      <div className='flex flex-col justify-center items-center h-full'>
        {data ? <SwipeCard
          data={data.currentBreed}
          nextBreed={data.nextBreed}
        /> : <div>Loading...</div>}
        <div className='mt-2 hidden lg:block'>
          <p>
            {data && "Swipe right if you like the breed, swipe left if you don't like the breed or click the button to like or dislike the breed"}
          </p>
          <p>
            Click to breed image to see more details and click the card to see breed image again
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

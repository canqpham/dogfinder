import { convertInfo, useGetBreeds } from '@/api/use-get-breeds';
import Layout from '@/components/layout';
import SwipeCard from '@/components/swipeCard';
import { BreedResponse } from '@/types';
import * as React from 'react';

const Home: React.FunctionComponent = () => {
  const initialBreedData = localStorage.getItem('currentBreed') || ""
    ? JSON.parse(localStorage.getItem('currentBreed') as string) as BreedResponse
    : null;
  console.log(initialBreedData);
  const [currentPage, setCurrentPage] = React.useState<number>(Number(localStorage.getItem('nextPage')) || 1);
  const [breedsQueue, setBreedsQueue] = React.useState<BreedResponse[]>(initialBreedData ? [initialBreedData] : []);

  const saveBreedsQueue = (data: BreedResponse[]) => {
    setBreedsQueue(pre => [...pre, ...data]);
  }

  const { isFetching } = useGetBreeds(currentPage, 10, saveBreedsQueue);

  const handleVote = () => {
    setBreedsQueue(pre => {
      const newQueue = [...pre];
      newQueue.shift();
      // Save the current breed id to local storage to avoid losing the current breed when refreshing the page
      localStorage.setItem("currentBreed", JSON.stringify(newQueue[0]));
      return newQueue;
    });
    // Check if we need to fetch more dogs (e.g., when queue < 11)
    if (breedsQueue.length < 6 && !isFetching) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  const currentBreed = breedsQueue?.[0] ? convertInfo(breedsQueue?.[0] || {}) : null;
  const nextBreed = breedsQueue?.[1] ? convertInfo(breedsQueue?.[1] || {}) : null;

  return (
    <Layout>
      <div className='flex flex-col justify-center items-center h-full'>
        {currentBreed ? <SwipeCard
          currentBreed={currentBreed}
          nextBreed={nextBreed}
          handleVote={handleVote}
        /> : <div>Loading...</div>}
        {breedsQueue?.[0] &&
          <div className='mt-2 hidden lg:block'>
            <p>
              Swipe right if you like the breed, swipe left if you don't like the breed and swipe up if you super like the breed
            </p>
            <p>
              Click the button to like or dislike the breed
            </p>
            <p>
              Click to breed image to see more details and click the card to see breed image again
            </p>
          </div>}
      </div>
    </Layout>
  );
};

export default Home;

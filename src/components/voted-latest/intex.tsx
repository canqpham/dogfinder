import * as React from 'react';
import VotedImage from '../voted';
import { useGetVotedLatestBreeds } from '@/api/use-get-voted-latest-breeds';

const VotedLatest: React.FunctionComponent = () => {
    const { data, isPending } = useGetVotedLatestBreeds();

    return (
        <div className=''>
            <div className='mt-2'>
                <span className='text-white text-xl'>
                    Voted Latest
                </span>
            </div>
            {
                isPending ? <div className='text-white'>Loading...</div> :
                    <div className='grid grid-cols-1 lg:grid-cols-1 gap-4 m-2'>
                        {data?.map((breed) => breed.image.url && (
                            <VotedImage
                                key={breed.id}
                                id={breed.image.id}
                                url={breed.image.url}
                                value={breed.value}
                            />
                        ))}
                    </div>
            }
        </div>
    );
};

export default VotedLatest;

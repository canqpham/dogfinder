import * as React from 'react';
import VotedImage from '../voted-image';
import { useVotedLatest } from '@/context/useVotedLatestContext';

const VotedLatest: React.FunctionComponent = () => {
    const { votedBreeds, isPending } = useVotedLatest();

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
                        {votedBreeds?.map((breed) => breed.image.url && (
                            <VotedImage
                                key={breed.id}
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

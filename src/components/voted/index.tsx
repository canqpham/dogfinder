import * as React from 'react';

interface IVotedImageProps {
    id: string;
    url: string;
    value: number;
}

const VotedImage: React.FunctionComponent<IVotedImageProps> = ({ id, url, value }) => {
    return (
        <div key={id} className='bg-white p-4 rounded-lg shadow-md'>
            <img src={url} alt={id} className='w-full h-64 object-cover rounded-lg' />
            <div>{getVotedStatus(value)}</div>
        </div>
    );
};

const getVotedStatus = (value: number) => {
    if (value > 0) {
        if (value > 1) {
            return 'Supper Liked';
        }
        return 'Liked';
    } else {
        return 'Disliked';
    }
}

export default VotedImage;

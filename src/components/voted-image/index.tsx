import * as React from 'react';

interface IVotedImageProps {
    url: string;
    value: number;
}

const VotedImage: React.FunctionComponent<IVotedImageProps> = ({ url, value }) => {
    return (
        <div key={url} className='bg-white p-2 rounded-lg shadow-md'>
            <img src={url} alt={url} className='w-full h-64 object-contain rounded-lg' />
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

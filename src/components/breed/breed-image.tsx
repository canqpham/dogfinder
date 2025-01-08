import * as React from 'react';
import { CardContent } from '../ui/card';

interface IBreedImageProps {
    src: string;
    name: string;
    bredFor: string;
}

const BreedImage: React.FunctionComponent<IBreedImageProps> = ({ src, name, bredFor }) => {
    return (
        <CardContent
            className='w-full max-w-sm p-2 h-[600px] flex flex-col items-end justify-end'
            style={{
                backgroundImage: `url(${src})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className='relative w-full'>
                <div className='w-full absolute left-0 bottom-0 p-2 flex flex-col gap-2 justify-start bg-neutral-500 bg-opacity-75 rounded-sm'>
                    <p className='text-left text-white shadow-sm text-xl'>{name}</p>
                    <p className='text-left text-white'>{bredFor}</p>
                </div>
            </div>
        </CardContent>
    );
};

export default BreedImage;

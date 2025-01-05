import * as React from 'react';
import { Card, CardFooter } from '../ui/card';
import { BreedInfo } from '@/types';
import { Button } from '../ui/button';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { useVoteBreed } from '@/api/use-vote-breed';
import BreedImage from '../breed/breed-image';
import BreedDetail from '../breed/breed-detail';
import Overlay from '../overlay';

interface ISwipeCardProps {
    data: BreedInfo;
    nextBreed?: BreedInfo;
}

const SwipeCard: React.FunctionComponent<ISwipeCardProps> = ({ data, nextBreed }) => {
    // State to manage the card position and opacity
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = React.useState(1);
    const { mutate, isPending } = useVoteBreed();
    const [isDetailMode, setIsDetailMode] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const draggableRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setPosition({ x: 0, y: 0 });
        setOpacity(1);
        setIsDetailMode(false);
    }, [data.id]);

    const handleDislike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setPosition({ x: -window.innerWidth, y: 0 });
        handleDismiss('left');
    };

    const handleLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setPosition({ x: -window.innerWidth, y: 0 });
        handleDismiss('right');
    };

    const handleSupperLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setPosition({ x: 0, y: -window.innerWidth });
        handleDismiss('up');
    };

    const handleDismiss = (direction: 'left' | 'right' | 'up') => {
        const offset = direction === 'left' ? -window.innerWidth : window.innerWidth;
        setPosition({ x: offset, y: 0 });
        setTimeout(() => {
            const value = direction === 'up' ? 2 : direction === 'left' ? -1 : 1;
            mutate({ image_id: data.id, value });
        }, 300); // Adjust the timeout as needed
    };

    const handleDrag = (e: DraggableEvent, data: DraggableData) => {
        setIsDragging(true);
        // Calculate the opacity based on the distance
        const maxDistance = 300;
        const distance = Math.abs(data.x);
        // Opacity should be 1 when the card is centered and 0 when it's at max distance
        const newOpacity = 1 - Math.min(distance / maxDistance, 1);
        setOpacity(newOpacity);
        // Restrict horizontal movement when swiping up
        if (data.y < -100) {
            setPosition({ x: 0, y: data.y });
        } else {
            setPosition({ x: data.x, y: data.y });
        }
    };

    const handleStop = (e: DraggableEvent, data: DraggableData) => {
        // Check if the card was dragged far enough to dismiss
        if (data.x < -100) {
            handleDismiss('left');
        } else if (data.x > 100) {
            handleDismiss('right');
        } else if (data.y < -100) {
            handleDismiss('up');
        } else {
            // Reset the card position when it's not dismissed
            setPosition({ x: 0, y: 0 });
            setOpacity(1);
        }
        setTimeout(() => setIsDragging(false), 0); // Reset dragging state after a short delay
    };

    const showBreedDetail = () => {
        if (!isDragging) {
            setIsDetailMode((pre) => !pre);
        }
    }

    return (
        <div
            className='mt-2 via-transparent to-transparent w-full max-w-sm rounded-xs shadow-lg rounded-xl transform transition-transform hover:-translate-y-2 bg-opacity-75'
            style={{ backgroundImage: `url(${nextBreed?.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <Overlay isPending={isPending} waitingFor='Vote is pending...' />
            <Draggable
                nodeRef={draggableRef}
                position={position}
                bounds={{ left: -200, right: 200, bottom: 0, top: -200 }}
                onDrag={handleDrag}
                onStop={handleStop}
            >
                <div ref={draggableRef} className='cursor-pointer '
                    style={{
                        opacity,
                        transition: "transform 0.3s ease, opacity 0.3s ease",
                    }}
                    onClick={showBreedDetail}>
                    <Card className='w-full max-w-sm select-none p-2'>
                        {isDetailMode ?
                            <BreedDetail data={data} />
                            :
                            <BreedImage src={data.url} name={data.name} bredFor={data.bred_for} />
                        }
                        <CardFooter className='w-full max-w-sm p-2'>
                            <div className='w-full flex justify-between'>
                                <Button variant="destructive" className='w-24 h-24 rounded-full text-white hover:bg-red-300 text-xl' onClick={handleDislike}>Dislike</Button>
                                <Button variant="default" className='w-24 h-24 rounded-full bg-white hover:bg-gray-100 text-xl' onClick={handleSupperLike}>⭐</Button>
                                <Button className='w-24 h-24 rounded-full bg-blue-500 text-white hover:bg-blue-600 text-xl' onClick={handleLike}>Like</Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </Draggable>
        </div>
    );
};

export default SwipeCard;

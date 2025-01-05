import * as React from 'react';

interface OverlayProps {
    isPending: boolean;
    waitingFor: string;
}

const Overlay: React.FunctionComponent<OverlayProps> = ({ isPending, waitingFor }) => {
    return (
        <div
            className='rounded-xl w-full h-full flex items-center justify-center'
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)", // 70% opacity
            }}
        >
            <span className='text-white text-3xl'>{isPending && waitingFor}</span>
        </div>
    );
};

export default React.memo(Overlay);
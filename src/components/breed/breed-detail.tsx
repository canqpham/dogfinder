import * as React from 'react';
import { CardContent } from '../ui/card';
import { BreedInfo } from '@/types';

interface IBreedDetailProps {
    data: BreedInfo;
}

const listShowFields: (keyof BreedInfo)[] = ["name", "bred_for", "height", "temperament", "life_span"];

const mapFieldToLabel: Partial<Record<keyof BreedInfo, string>> = {
    name: "Name",
    bred_for: "Bred For",
    height: "Height",
    temperament: "Temperament",
    life_span: "Life Span"
}


const BreedDetail: React.FunctionComponent<IBreedDetailProps> = ({ data }) => {

    return (
        <CardContent className='w-full max-w-sm p-2 h-[600px] flex flex-col'>
            {listShowFields.map((field) => {
                if (field === "height") {
                    return (
                        <div key={field} className='w-full p-2 flex flex-col gap-2 justify-start'>
                            <p className='text-left text-xl font-semibold'>{"Weight & Height"}</p>
                            <p className='text-left text-sm pl-2'>{`${data.weight} kg - ${data.height} cm`}</p>
                        </div>
                    );
                }
                return (
                    data?.[field] && (
                        <div key={field} className='w-full p-2 flex flex-col gap-2 justify-start'>
                            <p className='text-left text-xl font-semibold'>{mapFieldToLabel[field]}</p>
                            <p className='text-left text-sm pl-2'>{data?.[field] ? data?.[field] : ""}</p>
                        </div>
                    )
                )
            })}
        </CardContent>
    );
};

export default BreedDetail;

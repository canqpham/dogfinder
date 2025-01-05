import { useGetVotedBreeds } from '@/api/use-get-voted-breeds';
import Layout from '@/components/layout';
import { Checkbox } from '@/components/ui/checkbox';
import VotedImage from '@/components/voted';
import { CheckedState } from '@radix-ui/react-checkbox';
import * as React from 'react';


const Voted: React.FunctionComponent = () => {
    const { data, isPending } = useGetVotedBreeds();

    const [showLiked, setShowLiked] = React.useState(true);
    const [showDisliked, setShowDisliked] = React.useState(true);
    const [showSupperLiked, setShowSupperLiked] = React.useState(true);

    const filteredData = data?.filter((breed) => {
        if (showSupperLiked && breed.value === 2) return true;
        if (showLiked && breed.value === 1) return true;
        if (showDisliked && breed.value <= 0) return true;
        return false;
    });

    const handleShowLiked = (checked: CheckedState) => {
        if (typeof checked === 'boolean') {
            setShowLiked(checked);
        }
    };

    const handleShowDisliked = (checked: CheckedState) => {
        if (typeof checked === 'boolean') {
            setShowDisliked(checked);
        }
    };

    const handleShowSupperLiked = (checked: CheckedState) => {
        if (typeof checked === 'boolean') {
            setShowSupperLiked(checked);
        }
    };

    console.log('voted', data);
    return (
        <Layout>
            <div>
                <h1 className='text-4xl font-bold text-center'>Voted</h1>
                <div className='flex justify-center items-center h-full'>
                    <span className='text-2xl'>Thank you for voting!</span>
                </div>
                {isPending ? <div>Loading...</div> : <>
                    <div className='flex justify-center items-center space-x-4 my-4'>
                        <Checkbox id="terms1" checked={showSupperLiked} onCheckedChange={handleShowSupperLiked} />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="terms1"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Supper Liked
                            </label>
                        </div>
                        <Checkbox id="terms1" checked={showLiked} onCheckedChange={handleShowLiked} />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="terms1"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Liked
                            </label>
                        </div>
                        <Checkbox id="terms1" checked={showDisliked} onCheckedChange={handleShowDisliked} />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="terms1"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Disliked
                            </label>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        {filteredData?.map((breed) => breed.image.url && (
                            <VotedImage
                                key={breed.id}
                                id={breed.image.id}
                                url={breed.image.url}
                                value={breed.value}
                            />
                        ))}
                    </div>
                </>
                }
            </div>
        </Layout>
    );
};



export default Voted;

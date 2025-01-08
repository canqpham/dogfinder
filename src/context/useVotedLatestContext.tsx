import { useGetVotedLatestBreeds } from "@/api/use-get-voted-latest-breeds";
import { BreedInfo, GetVotedBreedsResponse } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

interface IVotedLatestProviderProps {
    children: React.ReactNode;
}

type VotedLatestContextData = {
    votedBreeds: GetVotedBreedsResponse[];
    pushVotedBreed: (breed: BreedInfo, value: number) => void;
    isPending?: boolean;
};

const useVotedLatestContext = createContext<VotedLatestContextData>({
    votedBreeds: [],
    pushVotedBreed: () => { },
    isPending: false
})

export const UserAuthProvider: React.FC<IVotedLatestProviderProps> = ({ children }) => {

    const [votedBreeds, setVotedBreeds] = useState<GetVotedBreedsResponse[]>([])

    const { data, isPending } = useGetVotedLatestBreeds()

    useEffect(() => {
        setVotedBreeds(data || [])
    }, [data])

    const pushVotedBreed = (breed: BreedInfo, value: number) => {
        const convertedData: GetVotedBreedsResponse = {
            image_id: breed.url,
            value: value,
            image: {
                id: breed.id,
                url: breed.url,
            }
        }
        setVotedBreeds(pre => [convertedData, pre[0]])
    }

    const value: VotedLatestContextData = {
        votedBreeds,
        pushVotedBreed,
        isPending
    }

    return (
        <useVotedLatestContext.Provider value={value}>
            {children}
        </useVotedLatestContext.Provider>
    )
}

export const useVotedLatest = () => {
    return useContext(useVotedLatestContext);
}
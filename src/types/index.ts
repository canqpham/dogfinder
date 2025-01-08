export interface BreedInfo {
  id: string;
  name: string;
  weight: string;
  height: string;
  life_span: string;
  temperament: string;
  bred_for: string;
  breed_group: string;
  url: string;
}

// Define a new type that only includes specific properties from BreedInfo
export type BreedInfoSubset = Pick<
  BreedInfo,
  "id" | "name" | "temperament" | "life_span" | "bred_for" | "breed_group"
> & {
  weight: { metric: string };
  height: { metric: string };
};

export interface BreedResponse {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: BreedInfoSubset[];
}

export interface VoteBreedResponse {
  id: string;
  image_id: string;
  value: number;
  message: string;
  country_code: string;
}

export interface GetVotedBreedsResponse {
  id?: number;
  image_id: string;
  sub_id?: string;
  created_at?: string;
  value: number;
  country_code?: string;
  image: {
    id?: string;
    url: string;
  };
}

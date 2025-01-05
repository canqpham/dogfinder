import { BreedInfo, BreedResponse } from "@/types";
import { getApi } from "./base";
import { useQuery } from "@tanstack/react-query";

const convertInfo = (data: BreedResponse) => {
  const newData: BreedInfo = {
    id: data.id,
    name: data.breeds[0].name,
    bred_for: data.breeds[0].bred_for,
    height: data.breeds[0].height.metric,
    temperament: data.breeds[0].temperament,
    life_span: data.breeds[0].life_span,
    weight: data.breeds[0].weight.metric,
    breed_group: data.breeds[0].breed_group,
    url: data.url,
  };
  return newData;
};

export const useGetBreed = () => {
  const query = useQuery({
    queryKey: ["breeds"],
    queryFn: async () => {
      const page = localStorage.getItem("page");
      const [currentBreed, nextBreed] = await Promise.all([
        getApi<
          BreedResponse[],
          { limit: number; page: number; order: string; has_breed: boolean }
        >("/images/search", {
          limit: 1,
          page: page ? parseInt(page) : 1,
          order: "ASC",
          has_breed: true,
        }),
        getApi<
          BreedResponse[],
          { limit: number; page: number; order: string; has_breed: boolean }
        >("/images/search", {
          limit: 1,
          page: page ? parseInt(page) + 1 : 2,
          order: "ASC",
          has_breed: true,
        }),
      ]);
      console.log("use get breed", currentBreed);
      if (!currentBreed) {
        throw new Error("Failed to fetch breed");
      }
      return {
        currentBreed: convertInfo(currentBreed?.[0]),
        nextBreed: convertInfo(nextBreed?.[0]),
      };
    },
  });
  return query;
};

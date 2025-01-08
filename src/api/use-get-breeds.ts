import { BreedInfo, BreedResponse } from "@/types";
import { getApi } from "./base";
import { useQuery } from "@tanstack/react-query";

export const convertInfo = (data: BreedResponse) => {
  if (!data) {
    return null;
  }
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

export const useGetBreeds = (
  currentPage: number,
  limit: number,
  saveBreedsQueue: (data: BreedResponse[]) => void
) => {
  const query = useQuery({
    queryKey: ["breeds", currentPage],
    queryFn: async () => {
      const data = await getApi<
        BreedResponse[],
        { limit: number; page: number; order: string; has_breed: boolean }
      >("/images/search", {
        limit: limit ?? 20,
        page: currentPage,
        order: "ASC",
        has_breed: true,
      });
      if (!data) {
        throw new Error("Failed to fetch breed");
      }
      const stored = localStorage.getItem("currentBreed");
      if (!stored) {
        const initCurrentBreed = data[0];
        // Save the current breed id to local storage to avoid losing the current breed when refreshing the page
        // when first fetching the breeds
        localStorage.setItem("currentBreed", JSON.stringify(initCurrentBreed));
      }
      // Save the next page to local storage to avoid losing the current page when refreshing the page
      localStorage.setItem("nextPage", (currentPage + 1).toString());
      saveBreedsQueue(data);
      return data;
    },
  });
  return query;
};

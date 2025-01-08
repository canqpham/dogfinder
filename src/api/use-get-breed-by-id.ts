import { BreedInfo, BreedResponse } from "@/types";
import { getApi } from "./base";
import { useQuery } from "@tanstack/react-query";

export const convertInfo = (data: BreedResponse) => {
  console.log("data", data);
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

export const useGetBreedById = (id: string, initialData: BreedInfo) => {
  const query = useQuery({
    queryKey: ["breed", id],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      const data = await getApi<BreedResponse>(`/images/${id}/breeds`);
      if (!data) {
        throw new Error("Failed to fetch breed");
      }
      return data;
    },
    staleTime: Infinity, // Prevent refetching
    cacheTime: Infinity, // Keep the data in cache indefinitely
    enabled: !initialData, // Only fetch if initialData is not provided
    initialData, // Use initialData if available
  });
  return query;
};

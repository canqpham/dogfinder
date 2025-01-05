import { GetVotedBreedsResponse } from "@/types";
import { getApi } from "./base";
import { useQuery } from "@tanstack/react-query";

export const useGetVotedLatestBreeds = () => {
  const query = useQuery({
    queryKey: ["voted-latest"],
    queryFn: async () => {
      const data = await getApi<
        GetVotedBreedsResponse[],
        { order: string; limit: number }
      >("/votes", { order: "DESC", limit: 2 });
      if (!data) {
        throw new Error("Failed to fetch breed");
      }
      return data;
    },
  });
  return query;
};

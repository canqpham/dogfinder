import { GetVotedBreedsResponse } from "@/types";
import { getApi } from "./base";
import { useQuery } from "@tanstack/react-query";

export const useGetVotedBreeds = () => {
  const query = useQuery({
    queryKey: ["voted"],
    queryFn: async () => {
      const data = await getApi<
        GetVotedBreedsResponse[],
        { order: string; limit: number }
      >("/votes", { order: "DESC", limit: 50 });
      if (!data) {
        throw new Error("Failed to fetch breed");
      }
      return data;
    },
  });
  return query;
};

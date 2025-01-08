import { VoteBreedResponse } from "@/types";
import { postApi } from "./base";
import { useMutation } from "@tanstack/react-query";

interface VoteBreedVariables {
  image_id: string;
  value: number;
}

export const useVoteBreed = () => {
  const mutation = useMutation<VoteBreedResponse, unknown, VoteBreedVariables>({
    mutationFn: async (json) => {
      const data = await postApi<VoteBreedResponse, VoteBreedVariables>(
        "/votes",
        json
      );
      if (!data) {
        throw new Error("Failed to fetch workspaces");
      }
      return data;
    },
  });
  return mutation;
};

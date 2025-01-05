import { VoteBreedResponse } from "@/types";
import { postApi } from "./base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface VoteBreedVariables {
  image_id: string;
  value: number;
}

export const useVoteBreed = () => {
  const queryClient = useQueryClient();
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
    onSuccess: () => {
      const currentPage = localStorage.getItem("page");
      localStorage.setItem(
        "page",
        currentPage ? `${parseInt(currentPage) + 1}` : "1"
      );
      queryClient.invalidateQueries({ queryKey: ["breeds"] });
      queryClient.invalidateQueries({ queryKey: ["voted-latest"] });
    },
  });
  return mutation;
};

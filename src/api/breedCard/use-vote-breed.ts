import { BreedResponse } from "@/types";
import { postApi } from "../base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface VoteBreedVariables {
  image_id: string,
  value: number;
}

export const useVoteBreed = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<BreedResponse[], unknown, VoteBreedVariables>({
    mutationFn: async (json) => {
      const data = await postApi<BreedResponse[], VoteBreedVariables>(
        "/votes",
        json
      );
      console.log("use get breed", data);
      if (!data) {
        throw new Error("Failed to fetch workspaces");
      }
      return data as BreedResponse[];
    },
    onSuccess: () => {
      const currentPage = localStorage.getItem("page");
      localStorage.setItem("page", currentPage ? `${parseInt(currentPage) + 1}` : "1");
      queryClient.invalidateQueries({queryKey: ["breeds"]});
    }
  });
  return mutation;
};

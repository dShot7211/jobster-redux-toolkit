import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "./utils/axios";

// when we want to fetch data we use useQuery hook of react query
export const useFetchData = ({ key, endpt }) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await customFetch.get(endpt);
      return data;
    },
  });
  return { isLoading, isError, data };
};

export const usePostRequest = () => {
  const queryClient = useQueryClient();
  const { mutate: postJsonData, isLoading } = useMutation({
    mutationFn: ({ endPt, data }) => customFetch.post(endPt, data),
    onSuccess: (key) => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
    onError: (error) => {},
  });
  return { postJsonData, isLoading };
};

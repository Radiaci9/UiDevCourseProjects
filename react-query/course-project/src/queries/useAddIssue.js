import { useMutation, useQueryClient } from "react-query";

const useAddIssue = ({onSuccess}) => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (issueBody) =>
      fetch("/api/issues", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(issueBody),
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["issues"], { exact: true });
        queryClient.setQueryData(["issues", String(data.number)], data);

        onSuccess?.(data.number);
      },
    }
  );
}

export default useAddIssue;

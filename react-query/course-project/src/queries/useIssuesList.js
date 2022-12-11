import { useQuery, useQueryClient } from "react-query";
import fetchWithError from "../helpers/fetchWithError";

const useIssuesList = ({labels, status}) => {
  const queryClient = useQueryClient();
  
  return useQuery(
    ["issues", { labels, status }],
    async ({signal}) => {
      const statusQuery = status ? `&status=${status}` : '';
      const labelQuery = labels.map((label) => `labels[]=${label}`).join("&");

      const results = await fetchWithError(`/api/issues?${labelQuery}${statusQuery}`, {signal});

      results.forEach(issue => {
        queryClient.setQueryData(["issues", String(issue.number)], issue);
      });

      return results;
    },
  );
  }

export default useIssuesList;
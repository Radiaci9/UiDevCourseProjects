import { useQuery, useQueryClient } from "react-query";
import fetchWithError from "../helpers/fetchWithError";

const useIssuesList = ({labels, status, pageNum}) => {
  const queryClient = useQueryClient();
  
  return useQuery(
    ["issues", { labels, status, pageNum }],
    async ({signal}) => {
      const statusQuery = status ? `&status=${status}` : '';
      const labelQuery = labels.map((label) => `labels[]=${label}`).join("&");
      const paginationQuery = pageNum ? `&page=${pageNum}` : "";

      const results = await fetchWithError(`/api/issues?${labelQuery}${statusQuery}${paginationQuery}`, {signal});

      results.forEach(issue => {
        queryClient.setQueryData(["issues", String(issue.number)], issue);
      });

      return results;
    },
    {
      keepPreviousData: true,
    }
  );
  }

export default useIssuesList;
import { useQuery } from "react-query";
import fetchWithError from "../helpers/fetchWithError";

const useIssuesList = ({labels, status}) => useQuery(
  ["issues", { labels, status }],
  () => {
    const statusQuery = status ? `&status=${status}` : '';
    const labelQuery = labels.map((label) => `labels[]=${label}`).join("&");

    return fetchWithError(`/api/issues?${labelQuery}${statusQuery}`);
  },
);

export default useIssuesList;
import { useQuery } from "react-query";

const useIssuesList = ({labels}) => useQuery(
  ["issues", { labels }],
  () => {
    const labelQuery = labels.map((label) => `labels[]=${label}`).join("&")
    return fetch(`/api/issues?${labelQuery}`).then(res => res.json());
  }
);

export default useIssuesList;
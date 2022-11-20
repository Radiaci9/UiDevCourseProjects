import { useQuery } from "react-query";

const useIssuesList = ({labels, status}) => useQuery(
  ["issues", { labels, status }],
  () => {
    const statusQuery = status ? `&status=${status}` : '';
    const labelQuery = labels.map((label) => `labels[]=${label}`).join("&")
    return fetch(`/api/issues?${labelQuery}${statusQuery}`).then(res => res.json());
  }
);

export default useIssuesList;


import { useQuery } from "react-query";

const useIssueData = (issueId) => useQuery(
  ["issues", issueId],
  ({signal}) => fetch(`/api/issues/${issueId}`, {signal}).then(res => res.json())
);

export default useIssueData;
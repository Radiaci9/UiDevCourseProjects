

import { useQuery } from "react-query";

const useIssueData = (issueId) => useQuery(
  ["issues", issueId, "comments"],
  ({signal}) => fetch(`/api/issues/${issueId}/comments`, {signal}).then(res => res.json())
);

export default useIssueData;
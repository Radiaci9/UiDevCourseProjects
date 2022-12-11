

import { useInfiniteQuery } from "react-query";

const useIssueComments = (issueId) => useInfiniteQuery(
  ["issues", issueId, "comments"],
  ({signal, pageParam}) => fetch(`/api/issues/${issueId}/comments?page=${pageParam}`, {signal}).then(res => res.json()),
  {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return;

      return pages.length + 1;
    }
  }
);

export default useIssueComments;
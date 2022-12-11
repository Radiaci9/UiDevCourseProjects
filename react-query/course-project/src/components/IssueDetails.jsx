import { useParams } from "react-router-dom";
import useIssueData from "../queries/useIssueData";
import useIssueComments from "../queries/useIssueComments";
import useScrollToBottomAction from "../helpers/useScrollToBottomAction";
import IssueHeader from "./IssueHeader";
import Comment from "./Comment";
import IssueStatus from "./IssueStatus";
import IssueAssignment from "./IssueAssignment";
import IssueLabels from "./IssueLabels";
import Loader from "./Loader";

export default function IssueDetails() {
  const { number } = useParams();
  const { isLoading, data: issue} = useIssueData(number);
  const commentsQuery = useIssueComments(number);

  useScrollToBottomAction(document, commentsQuery.fetchNextPage, 100);

  return (
    <div className="issue-details">
      {isLoading ? (
        <p>Loading issue...</p>
      ) : (
        <>
          <IssueHeader {...issue} />

          <main>
            <section>
              {commentsQuery.isLoading ? (
                <p>Loading...</p>
              ) : (
                commentsQuery.data.pages?.map((commentPage) => commentPage?.map((comment) => (
                  <Comment key={comment.id} {...comment} />
                )))
              )}
              {commentsQuery.isFetchingNextPage && <Loader />}
            </section>
            <aside>
              <IssueStatus
                status={issue.status}
                issueNumber={String(issue.number)}
              />
              <IssueAssignment
                assignee={issue.assignee}
                issueNumber={String(issue.number)}
              />
              <IssueLabels
                labels={issue.labels}
                issueNumber={String(issue.number)}
              />
            </aside>
          </main>
        </>
      )}
    </div>
  );
}

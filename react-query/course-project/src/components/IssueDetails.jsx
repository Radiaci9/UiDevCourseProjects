import { useParams } from "react-router-dom";
import useIssueData from "../queries/useIssueData";
import useIssueComments from "../queries/useIssueComments";
import IssueHeader from "./IssueHeader";
import Comment from "./Comment";
import IssueStatus from "./IssueStatus";
import IssueAssignment from "./IssueAssignment";

export default function IssueDetails() {
  const { number } = useParams();
  const { isLoading, data: issue} = useIssueData(number);
  const { isLoading: isCommentsLoading, data: issueComments} = useIssueComments(number);

  return (
    <div className="issue-details">
      {isLoading ? (
        <p>Loading issue...</p>
      ) : (
        <>
          <IssueHeader {...issue} />

          <main>
            <section>
              {isCommentsLoading ? (
                <p>Loading...</p>
              ) : (
                issueComments?.map((comment) => (
                  <Comment key={comment.id} {...comment} />
                ))
              )}
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
            </aside>
          </main>
        </>
      )}
    </div>
  );
}

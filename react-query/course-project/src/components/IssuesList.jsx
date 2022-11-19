import useIssuesList from "../queries/useIssuesList";
import IssueItem from "./IssueItem";

const IssuesList = () => {
  const {isLoading, data} = useIssuesList();

  return (
    <div>
      <h1>Issues List</h1>
      {
        isLoading ? <p>Loading...</p> : (
          <ul className="issues-list">
            {
              data.map((issue) => (
                <IssueItem
                  key={issue.id}
                  title={issue.title}
                  number={issue.number}
                  assignee={issue.assignee}
                  commentCount={issue.comments.length}
                  createdBy={issue.createdBy}
                  createdDate={issue.createdDate}
                  labels={issue.labels}
                  status={issue.status}
                />
              ))
            }
          </ul>
        )
      }
    </div>
  );
}

export default IssuesList;

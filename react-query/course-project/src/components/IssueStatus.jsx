
import useSetIssueStatus from "../queries/useSetIssueStatus";
import StatusSelect from "./StatusSelect";

export default function IssueStatus({ status, issueNumber }) {
  const setStatus = useSetIssueStatus({issueNumber});
  return (
    <div className="issue-options">
      <div>
        <span>Status</span>
        <StatusSelect
          noEmptyOption
          value={status}
          onChange={(event) => setStatus.mutate(event.target.value)}
        />
      </div>
    </div>
  );
}
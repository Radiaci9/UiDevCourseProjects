import { GoIssueOpened, GoIssueClosed, GoComment } from "react-icons/go";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { STATUSES } from "../helpers/constants";
import fetchWithError from "../helpers/fetchWithError";
import { relativeDate } from "../helpers/relativeDate";
import useUserData from "../queries/useUserData";
import Label from "./Label";

const IssueItem = ({
  title,
  number,
  assignee,
  commentCount,
  createdBy,
  createdDate,
  labels,
  status,
}) => {
  const queryClient = useQueryClient();

  const {isSuccess: isAssigneeUserSuccess, data: assigneeUser} = useUserData(assignee);
  const {isSuccess: isCreatedByUserSuccess, data: createdByUser} = useUserData(createdBy);

  return (
    <li onMouseEnter={() => {
      queryClient.prefetchQuery(["issues", String(number)], () => fetchWithError(`/api/issues/${number}`));
      queryClient.prefetchQuery(["issues", String(number), "comments"], () => fetchWithError(`/api/issues/${number}/comments`));
    }}>
      <div>
        {status === STATUSES.DONE || status === STATUSES.CANCELLED ? (
          <GoIssueClosed style={{color: "red"}} />
        ) : (
          <GoIssueOpened style={{color: "green"}} />
        )}
      </div>
      <div className="issue-content">
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {
            labels.map((label) => (
              <Label key={label} label={label} />
            ))
          }
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)} {isCreatedByUserSuccess ? `by ${createdByUser.name}` : ''}
        </small>
      </div>
      {isAssigneeUserSuccess && assigneeUser?.profilePictureUrl ? <img src={assigneeUser.profilePictureUrl} className="assigned-to" alt={`Assigned to ${assigneeUser.name}`} /> : null}
      <span className="comment-count">
        {commentCount > 0 ? (
          <>
            <GoComment/>
            {commentCount}
          </>
        ) : null}
      </span>
    </li>
  );
}

export default IssueItem;

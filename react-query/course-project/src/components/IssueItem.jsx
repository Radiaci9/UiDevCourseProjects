import { GoIssueOpened, GoIssueClosed, GoComment } from "react-icons/go";
import { Link } from "react-router-dom";
import { relativeDate } from "../helpers/relativeDate";
import useUserData from "../queries/useUserData";
import Label from "./Label";

const STATUSES = {
  DONE: "done",
  CANCELLED: "cancelled",
};

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
  const {isSuccess: isAssigneeUserSuccess, data: assigneeUser} = useUserData(assignee);
  const {isSuccess: isCreatedByUserSuccess, data: createdByUser} = useUserData(createdBy);

  return (
    <li>
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

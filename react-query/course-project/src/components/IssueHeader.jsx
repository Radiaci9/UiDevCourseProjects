import { GoIssueOpened, GoIssueClosed } from "react-icons/go";
import { possibleStatus } from "../helpers/defaultData";
import { relativeDate } from "../helpers/relativeDate";
import { STATUSES } from "../helpers/constants";
import useUserData from "../queries/useUserData";

const IssueHeader = ({
  title,
  number,
  status = STATUSES.TODO,
  createdBy,
  createdDate,
  comments,
}) => {
  const statusObject = possibleStatus.find((pstatus) => pstatus.id === status);

  const {isLoading, data: user} = useUserData(createdBy);
  return (
    <header>
      <h2>
        {title} <span>#{number}</span>
      </h2>
      <div>
        <span
          className={
            status === STATUSES.DONE || status === STATUSES.CANCELLED ? "closed" : "open"
          }
        >
          {status === STATUSES.DONE || status === STATUSES.CANCELLED ? (
            <GoIssueClosed />
          ) : (
            <GoIssueOpened />
          )}
          {statusObject.label}
        </span>
        <span className="created-by">
          {isLoading ? "..." : user?.name}
        </span>{" "}
        opened this issue {relativeDate(createdDate)} · {comments?.length}{" "}
        comments
      </div>
    </header>
  );
};

export default IssueHeader;
import { relativeDate } from "../helpers/relativeDate";
import useUserData from "../queries/useUserData";

const Comment = ({ comment, createdBy, createdDate }) => {
  const {isLoading, data: user} = useUserData(createdBy);

  if (isLoading)
    return (
      <div className="comment">
        <div>
          <div className="comment-header">Loading...</div>
        </div>
      </div>
    );

  return (
    <div className="comment">
      <img src={user.profilePictureUrl} alt="Commenter Avatar" />
      <div>
        <div className="comment-header">
          <span>{user.name}</span> commented{" "}
          <span>{relativeDate(createdDate)}</span>
        </div>
        <div className="comment-body">{comment}</div>
      </div>
    </div>
  );
};

export default Comment;
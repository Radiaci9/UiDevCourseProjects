import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useAddIssue from "../queries/useAddIssue";

const AddIssue = () => {
  const navigate = useNavigate();

  const onAddIssueSuccess = useCallback((number) => {
    navigate(`/issue/${number}`);
  }, [navigate]);

  const addIssue = useAddIssue({onSuccess: onAddIssueSuccess});
  
  return (
    <div className="add-issue">
      <h2>Add Issue</h2>
      <form
        disabled={addIssue.isLoading}
        onSubmit={(event) => {
          event.preventDefault();
          addIssue.mutate({
            comment: event.target.comment.value,
            title: event.target.title.value,
          });
        }}
      >
        <label htmlFor="title">Title</label>
        <input type="text" id="title" placeholder="Title" name="title" />
        <label htmlFor="comment">Comment</label>
        <textarea placeholder="Comment" id="comment" name="comment" />
        <button type="submit" disabled={addIssue.isLoading}>
          {addIssue.isLoading ? "Adding Issue..." : "Add Issue"}
        </button>
      </form>
    </div>
  );
}

export default AddIssue;

import { GoGear } from "react-icons/go";
import { useState } from "react";
import useSetIssueAssignment from "../queries/useSetIssueAssignment";
import useUserData from "../queries/useUserData";
import useUsers from "../queries/useUsers";

const IssueAssignment = ({ assignee, issueNumber }) => {
  const user = useUserData(assignee);
  const [menuOpen, setMenuOpen] = useState(false);
  const usersQuery = useUsers();

  const setAssignment = useSetIssueAssignment({issueNumber})

  return (
    <div className="issue-options">
      <div>
        <span>Assignment</span>
        {user.isSuccess && (
          <div>
            <img src={user.data.profilePictureUrl} />
            {user.data.name}
          </div>
        )}
      </div>
      <GoGear
        onClick={() => !usersQuery.isLoading && setMenuOpen((open) => !open)}
      />
      {menuOpen && (
        <div className="picker-menu">
          {usersQuery.data?.map((user) => (
            <div key={user.id} onClick={() => setAssignment.mutate(user.id)}>
              <img src={user.profilePictureUrl} />
              {user.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default IssueAssignment;

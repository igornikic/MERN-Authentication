import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PageTitle from "../layout/PageTitle";
import Loader from "../layout/Loader";
import Alert from "../../utils/Alert";

import { allUsers, clearErrors } from "../../features/user/allUsersSlice";
import { deleteUser, deleteUserReset } from "../../features/user/userSlice";

const UsersList = () => {
  const dispatch = useDispatch();

  // Defines state for searchQuery
  const [searchQuery, setSearchQuery] = useState("");

  // Get allUsers and user state from redux store
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  // Get all users on component mount
  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  // Dispatche deleteUser and allUsers actions to the Redux store
  const deleteUserHandler = async (id) => {
    await dispatch(deleteUser(id));
    // Get user data again to refresh the list
    await dispatch(allUsers());
  };

  // Filters the users based on the search query
  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="form-style">
      <PageTitle title="All Users" />

      {loading && <Loader />}
      {/* Alert component that displays message and clears it */}
      {error && <Alert message={error} clear={clearErrors} type={"error"} />}
      {isDeleted && (
        <Alert
          message={"User Deleted Successfully"}
          clear={deleteUserReset}
          type={"success"}
        />
      )}

      <h1>All Users</h1>
      <input
        className="users-list-input"
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="users-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            return (
              <div key={user._id} className="user-data">
                <div>
                  <strong>Id </strong>
                  {user._id}
                </div>
                <div>
                  <strong>Name </strong>
                  {user.name}
                </div>
                <div>
                  <strong>Email </strong>
                  {user.email}
                </div>
                <div>
                  <strong>Role </strong>
                  {user.role}
                </div>
                <Link to={`/admin/user/${user._id}`}>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg>
                  </button>
                </Link>
                <button onClick={() => deleteUserHandler(user._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </button>
              </div>
            );
          })
        ) : (
          <p>Not Found!</p>
        )}
      </div>
    </div>
  );
};

export default UsersList;

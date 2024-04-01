import { useState, useEffect, useCallback } from "react";
import FriendList from "../shared/Friends";
import "../../App.css";

function SearchFriends(props) {
  const { onClick, friends, addedMembers, isError, isLoading } = props;

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const showSearchResults = useCallback(() => {
    setResults(
      friends.filter((friend) => {
        if (friend.isFriend) return false;
        if (search.length === 0) return false;
        const nameMatch = friend.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const usernameMatch = friend.username
          .toLowerCase()
          .includes(search.toLowerCase());
        return nameMatch || usernameMatch;
      })
    );
  }, [friends, search]);

  useEffect(() => {
    showSearchResults();
  }, [friends, search, showSearchResults]);

  return (
    <>
      <div className="friends-search-container">
        <input
          type="text"
          placeholder="Search for your friends here"
          className={
            isLoading
              ? "friends-search friends-search-loading"
              : isError
                ? `friends-search bg-red-50 border border-red-300 text-red-900`
                : `friends-search border border-black`
          }
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              showSearchResults();
            }
          }}
        />
        <button
          className="material-icons friends-search-icon"
          onClick={() => showSearchResults()}
        >
          search
        </button>
      </div>
      <div className="friends-results">
        <FriendList
          friends={results}
          onClick={onClick}
          showFriend={false}
          showSearchResults={showSearchResults}
          addedMembers={addedMembers}
          showButton={true}
        />
      </div>
    </>
  );
}

export default SearchFriends;

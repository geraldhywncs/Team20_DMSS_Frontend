import { useState } from "react";
import FriendList from "../shared/Friends";
import "../../App.css";

function SearchFriends(props) {
  const { onClick, friends } = props;

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  function showSearchResults() {
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
  }
  return (
    <>
      <div className="friends-search-container">
        <input
          type="text"
          placeholder="Search for your friends here"
          className="friends-search"
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
        <FriendList friends={results} onClick={onClick} showFriend={false} />
      </div>
    </>
  );
}

export default SearchFriends;

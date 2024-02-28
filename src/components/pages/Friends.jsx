import { useState } from "react";
import Section from "../shared/Section";
import FriendList from "../shared/Friends";
import "../../styles/pages/Friends.css";

function Friends() {
  return (
    <>
      <SearchFriends />
      <ExistingFriends />
    </>
  );
}

function SearchFriends() {
  const friends = [
    { name: "Jun Jie", username: "junjie", isFriend: true },
    { name: "Wei Jie", username: "weijie", isFriend: true },
    { name: "Jedrek", username: "jedrek", isFriend: true },
    { name: "Weii Zee", username: "weiizee", isFriend: false },
  ];

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
    <Section headerName={"Search for friends"}>
      <div className="friends-search-container">
        <input
          type={"text"}
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
        <FriendList friends={results} />
      </div>
    </Section>
  );
}

function ExistingFriends() {
  const friends = [
    { name: "Jun Jie", username: "junjie", isFriend: true },
    { name: "Wei Jie", username: "weijie", isFriend: true },
    { name: "Jedrek", username: "jedrek", isFriend: true },
    { name: "Weii Zee", username: "weiizee", isFriend: false },
  ];
  return (
    <Section headerName={"Added friends"}>
      <FriendList friends={friends} />
    </Section>
  );
}

export default Friends;

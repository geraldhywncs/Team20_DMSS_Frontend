import React from "react";

function Friends(props) {
  const { friends } = props;
  return (
    <div className="friends-container">
      {friends.map((friend) => (
        <FriendCard
          name={friend.name}
          username={friend.username}
          isFriend={friend.isFriend}
        />
      ))}
    </div>
  );
}

function FriendCard(props) {
  const { name, username, isFriend } = props;
  return (
    <div className="friend-container">
      <div className="friend-info body-large font-medium">{`${name} | @${username}`}</div>
      <button className="material-icons">
        {isFriend ? "person_remove" : "person_add"}
      </button>
    </div>
  );
}

export default Friends;

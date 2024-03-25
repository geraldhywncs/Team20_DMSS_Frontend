import React from "react";

function Friends(props) {
  const { friends, onClick, showFriend } = props;
  const updatedFriends = friends.filter(
    (friend) => friend.isFriend === showFriend
  );
  return (
    <div className="friends-container">
      {updatedFriends.map((friend, index) => (
        <FriendCard key={index} friend={friend} onClick={onClick} />
      ))}
    </div>
  );
}

function FriendCard(props) {
  const { friend, onClick } = props;
  return (
    <div className="friend-container">
      <div className="friend-info body-large font-medium">
        {`${friend.name} | @${friend.username}`}
      </div>
      <button className="material-icons" onClick={() => onClick(friend)}>
        {friend.isFriend ? "person_remove" : "person_add"}
      </button>
    </div>
  );
}

export default Friends;

import { useState } from "react";

function Friends(props) {
  const { friends, onClick, showFriend, addedMembers, showButton } = props;
  const updatedFriends = friends.filter(
    (friend) => friend.isFriend === showFriend
  );
  return (
    <div className="friends-container">
      {updatedFriends.map((friend, index) => (
        <FriendCard
          key={index}
          friend={friend}
          onClick={onClick}
          addedMembers={addedMembers}
          showButton={showButton}
        />
      ))}
    </div>
  );
}

function FriendCard(props) {
  const { friend, onClick, addedMembers, showButton } = props;
  const [groupMembers, setGroupMembers] = useState(addedMembers);
  return (
    <div className="friend-container">
      <div className="friend-info body-large font-medium">
        {`${friend.name} | @${friend.username}`}
      </div>
      {showButton && (
        <button
          className="material-icons"
          onClick={() => {
            onClick(friend);
            if (groupMembers == null) return;
            if (groupMembers.includes(friend.username)) {
              setGroupMembers(
                groupMembers.filter((username) => username !== friend.username)
              );
            } else {
              setGroupMembers([...groupMembers, friend.username]);
            }
          }}
        >
          {friend.isFriend ||
          (groupMembers != null && groupMembers.includes(friend.username))
            ? "person_remove"
            : "person_add"}
        </button>
      )}
    </div>
  );
}

export default Friends;

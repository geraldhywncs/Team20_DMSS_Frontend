import Section from "../shared/Section";
import FriendList from "../shared/Friends";
import SearchFriends from "../shared/SearchFriends";

function Friends() {
  const friends = [
    { name: "Jun Jie", username: "junjie", isFriend: true },
    { name: "Wei Jie", username: "weijie", isFriend: true },
    { name: "Jedrek", username: "jedrek", isFriend: true },
    { name: "Weii Zee", username: "weiizee", isFriend: false },
  ];
  return (
    <>
      <Section headerName="Search for friends">
        <SearchFriends
          onClick={() => {
            // add/remove friend logic
          }}
          friends={friends}
        />
      </Section>
      <ExistingFriends />
    </>
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
    <Section headerName="Added friends">
      <FriendList
        friends={friends}
        onClick={() => {
          // add/remove friend logic
        }}
      />
    </Section>
  );
}

export default Friends;

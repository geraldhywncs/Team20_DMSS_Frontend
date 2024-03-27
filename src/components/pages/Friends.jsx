import Section from "../shared/Section";
import FriendList from "../shared/Friends";
import SearchFriends from "../shared/SearchFriends";
import { useState, useEffect } from "react";
import callApi from "../shared/callAPI";

function Friends() {
  const [allUsers, setAllUsers] = useState([]);
  const [allFriends, setAllFriends] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userID = localStorage.getItem("userId");
      try {
        const usersEndPoint = process.env.REACT_APP_apiHost + "/users";
        const usersResponse = await callApi(usersEndPoint, "GET");
        setAllUsers(usersResponse.users);

        const friendsEndPoint =
          process.env.REACT_APP_apiHost + `/friends/${userID}`;
        const friendsResponse = await callApi(friendsEndPoint, "GET");
        setAllFriends(friendsResponse.friends);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData function when the component mounts
  }, []);

  useEffect(() => {
    generateFriends(allUsers, allFriends);
  }, [allUsers, allFriends]); // Run when allUsers or allFriends change

  function generateFriends(allUsers, allFriends) {
    const friendsId = allFriends.map((f) => f.id);
    const generatedFriends = allUsers.map((user) => {
      return {
        id: user.user_id,
        name: `${user.first_name} ${user.last_name}`,
        username: user.user_name,
        isFriend: friendsId.includes(user.user_id) ? true : false,
      };
    });
    setFriends(
      generatedFriends.filter(
        (f) => `${f.id}` !== localStorage.getItem("userId")
      )
    );
  }

  const handleFriendClick = async (friend) => {
    const friendIds = allFriends.map((f) => f.id);
    const userID = localStorage.getItem("userId");
    try {
      const apiEndpoint = process.env.REACT_APP_apiHost + `/friends/${userID}`;
      const params = { friend_id: friend.id };

      if (friendIds.includes(friend.id)) {
        // REMOVE FRIEND
        const response = await callApi(apiEndpoint, "DELETE", params);
        setAllFriends((allFriends) =>
          allFriends.filter((f) => f.id !== response.friend.friend_id)
        );
      } else {
        // ADD FRIEND
        const response = await callApi(apiEndpoint, "POST", params);
        setAllFriends((allFriends) => [
          ...allFriends,
          {
            id: response.friend.user_id,
            name: `${response.friend.first_name} ${response.friend.last_name}`,
            username: response.friend.user_name,
            isFriend: true,
          },
        ]);
      }
      // Handle the response if needed
    } catch (error) {
      console.error("Error performing action:", error);
    }
  };

  return (
    <>
      <Section headerName="Search for friends">
        <SearchFriends onClick={handleFriendClick} friends={friends} />
      </Section>
      <ExistingFriends
        friends={friends}
        handleFriendClick={handleFriendClick}
      />
    </>
  );
}

function ExistingFriends(props) {
  const { friends, handleFriendClick } = props;

  return (
    <Section headerName="Added friends">
      <FriendList
        friends={friends}
        onClick={handleFriendClick}
        showFriend={true}
      />
    </Section>
  );
}

export default Friends;

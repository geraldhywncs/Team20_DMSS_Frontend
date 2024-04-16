import Section from "../shared/Section";
import FriendList from "../shared/Friends";
import SearchFriends from "../shared/SearchFriends";
import { useState, useEffect } from "react";
import callApi from "../shared/callAPI";
import LoadingMessage from "../shared/LoadingMessage";
import { REACT_APP_apiHost } from "../../ENV";

function Friends() {
  const [allUsers, setAllUsers] = useState([]);
  const [allFriends, setAllFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userID = localStorage.getItem("userId");
      setLoading(true);
      try {
        const usersEndPoint = REACT_APP_apiHost + "/users";
        const usersResponse = await callApi(usersEndPoint, "GET");
        setAllUsers(usersResponse.users);

        const friendsEndPoint = REACT_APP_apiHost + `/friends/${userID}`;
        const friendsResponse = await callApi(friendsEndPoint, "GET");
        setAllFriends(friendsResponse.friends);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    generateFriends(allUsers, allFriends);
  }, [allUsers, allFriends]);

  function generateFriends(allUsers, allFriends) {
    // check all friend_id, return custom friend object
    const friendsId = allFriends.map((f) => f.friend_id);
    const generatedFriends = allUsers.map((user) => {
      return {
        id: user.user_id,
        name: `${user.first_name} ${user.last_name}`,
        username: user.user_name,
        isFriend: friendsId.includes(user.user_id) ? true : false,
      };
    });

    // filter out self
    setFriends(
      generatedFriends.filter(
        (f) => `${f.id}` !== localStorage.getItem("userId")
      )
    );
  }

  const handleFriendClick = async (friend) => {
    const friendIds = allFriends.map((f) => f.friend_id);
    const userID = localStorage.getItem("userId");
    try {
      const apiEndpoint = REACT_APP_apiHost + `/friends/${userID}`;
      const params = { friend_id: friend.id };

      if (friendIds.includes(friend.id)) {
        // REMOVE FRIEND
        const response = await callApi(apiEndpoint, "DELETE", params);
        setAllFriends(
          allFriends.filter((f) => f.friend_id !== response.friend.friend_id)
        );
      } else {
        // ADD FRIEND
        const response = await callApi(apiEndpoint, "POST", params);
        setAllFriends([...allFriends, response.friend]);
      }
      // Handle the response if needed
    } catch (error) {
      console.error("Error performing action:", error);
    }
  };

  return (
    <>
      {loading && <LoadingMessage message="Loading..." />}
      <Section headerName="Search for friends">
        <SearchFriends
          isLoading={loading}
          onClick={handleFriendClick}
          friends={friends}
          isError={false}
          search={search}
          setSearch={setSearch}
          results={results}
          setResults={setResults}
        />
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
        showButton={true}
      />
    </Section>
  );
}

export default Friends;

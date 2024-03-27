import { useState, useEffect } from "react";
import Section from "../shared/Section";
import SearchFriends from "../shared/SearchFriends";
import "../../styles/pages/Groups.css";
import GroupsView from "../shared/Groups";
import Button from "../shared/Button";
import callApi from "../shared/callAPI";

function Groups() {
  return (
    <>
      <CreateGroup />
      <ExistingGroups />
    </>
  );
}

function CreateGroup() {
  const [addedMembers, setAddedMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersEndPoint = process.env.REACT_APP_apiHost + "/users";
        const usersResponse = await callApi(usersEndPoint, "GET");
        setAllUsers(usersResponse.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData function when the component mounts
  }, []);

  useEffect(() => {
    generateFriends(allUsers);
  }, [allUsers]); // Run when allUsers or allFriends change

  function generateFriends(allUsers) {
    const generatedFriends = allUsers.map((user) => {
      return {
        id: user.user_id,
        name: `${user.first_name} ${user.last_name}`,
        username: user.user_name,
        isFriend: addedMembers.includes(user.user_id) ? true : false,
      };
    });
    setFriends(
      generatedFriends.filter(
        (f) => `${f.id}` !== localStorage.getItem("userId")
      )
    );
  }

  // const friends = [
  //   { name: "Jun Jie", username: "junjie", isFriend: false },
  //   { name: "Wei Jie", username: "weijie", isFriend: false },
  //   { name: "Jedrek", username: "jedrek", isFriend: false },
  //   { name: "Weii Zee", username: "weiizee", isFriend: false },
  // ];
  return (
    <Section headerName={"Create Group"}>
      <div className="groups-container">
        <div className="groups-name-container body-medium font-regular">
          <label className="groups-name-label">Group Name: </label>
          <input
            className="groups-name-input"
            type="text"
            placeholder="Fill group name here"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="body-medium font-regular">
          {`Members: ${addedMembers.map((username) => `@${username}`).join(", ")}`}
        </div>
        <SearchFriends
          onClick={(friend) => {
            if (addedMembers.includes(friend.username)) {
              setAddedMembers(
                addedMembers.filter((member) => member !== friend.username)
              );
            } else {
              setAddedMembers([...addedMembers, friend.username]);
            }
          }}
          friends={friends}
          addedMembers={addedMembers}
        />
      </div>
      <div className="groups-button">
        <Button color={"blue"} text={"Create group"} />
      </div>
    </Section>
  );
}

function ExistingGroups() {
  return (
    <Section headerName="Existing Groups">
      <GroupsView />
    </Section>
  );
}

export default Groups;

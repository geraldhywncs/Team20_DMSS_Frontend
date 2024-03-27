import { useState, useEffect } from "react";
import Section from "../shared/Section";
import SearchFriends from "../shared/SearchFriends";
import "../../styles/pages/Groups.css";
import GroupsView from "../shared/Groups";
import Button from "../shared/Button";
import callApi from "../shared/callAPI";

function Groups() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userID = localStorage.getItem("userId");
      try {
        const endPoint = process.env.REACT_APP_apiHost + `/groups/${userID}`;
        const response = await callApi(endPoint, "GET");
        console.log(response.groups);

        // setGroups(response.groups);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData function when the component mounts
  }, []);

  return (
    <>
      <CreateGroup groups={groups} setGroups={setGroups} />
      <ExistingGroups groups={groups} />
    </>
  );
}

function CreateGroup(props) {
  const { groups, setGroups } = props;
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

    generateFriends(allUsers);
  }, [allUsers, addedMembers]); // Run when allUsers or addedMembers change

  const handleCreateGroup = async () => {
    const userID = localStorage.getItem("userId");
    try {
      const endPoint = process.env.REACT_APP_apiHost + "/groups";
      const data = JSON.stringify({
        group_name: groupName,
        group_member_ids: [userID, ...addedMembers.map((member) => member.id)],
      });
      const response = await callApi(endPoint, "POST", data);
      setGroups([
        ...groups,
        {
          name: response.group.group_name,
          usernames: response.group_members.map((members) => members.user_name),
        },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const friends = [
  //   { name: "Jun Jie", username: "junjie", isFriend: false },
  //   { name: "Wei Jie", username: "weijie", isFriend: false },
  //   { name: "Jedrek", username: "jedrek", isFriend: false },
  //   { name: "Weii Zee", username: "weiizee", isFriend: false },
  // ];

  const addedMemberUsernames = addedMembers.map((member) => member.username);
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
          {`Members: ${addedMemberUsernames.map((username) => `@${username}`).join(", ")}`}
        </div>
        <SearchFriends
          onClick={(friend) => {
            const addedMemberUsernames = addedMembers.map(
              (member) => member.username
            );
            if (addedMemberUsernames.includes(friend.username)) {
              setAddedMembers(
                addedMembers.filter(
                  (member) => member.username !== friend.username
                )
              );
            } else {
              setAddedMembers([...addedMembers, friend]);
            }
          }}
          friends={friends}
          addedMembers={addedMemberUsernames}
        />
      </div>
      <div className="groups-button" onClick={handleCreateGroup}>
        <Button color={"blue"} text={"Create group"} />
      </div>
    </Section>
  );
}

function ExistingGroups(props) {
  const { groups } = props;
  return (
    <Section headerName="Existing Groups">
      <GroupsView groups={groups} />
    </Section>
  );
}

export default Groups;

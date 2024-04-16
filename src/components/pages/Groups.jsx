import { useState, useEffect } from "react";
import Section from "../shared/Section";
import SearchFriends from "../shared/SearchFriends";
import "../../styles/pages/Groups.css";
import GroupsView from "../shared/Groups";
import Button from "../shared/Button";
import callApi from "../shared/callAPI";
import LoadingMessage from "../shared/LoadingMessage";
import { REACT_APP_apiHost } from "../../ENV";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userID = localStorage.getItem("userId");
      try {
        const endPoint = REACT_APP_apiHost + `/groups/${userID}`;
        const response = await callApi(endPoint, "GET");
        setGroups(response.groups);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && <LoadingMessage message="Loading..." />}
      <CreateGroup
        groups={groups}
        setGroups={setGroups}
        loading={loading}
        setLoading={setLoading}
      />
      <ExistingGroups groups={groups} />
    </>
  );
}

function CreateGroup(props) {
  const { groups, setGroups, loading, setLoading } = props;
  const [addedMembers, setAddedMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [allFriends, setAllFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [isValidGroup, setIsValidGroup] = useState(true);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userID = localStorage.getItem("userId");
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
    function generateFriends(allUsers, allFriends) {
      // check all friend_id, return custom friend object
      const friendsId = allFriends.map((f) => f.friend_id);
      const searachableFriends = allUsers.filter((user) =>
        friendsId.includes(user.user_id)
      );
      const generatedFriends = searachableFriends.map((user) => {
        return {
          id: user.user_id,
          name: `${user.first_name} ${user.last_name}`,
          username: user.user_name,
          isFriend: addedMembers.includes(user.user_id) ? true : false,
        };
      });

      // filter out self
      setFriends(
        generatedFriends.filter(
          (f) => `${f.id}` !== localStorage.getItem("userId")
        )
      );
    }

    generateFriends(allUsers, allFriends);
  }, [allUsers, allFriends, addedMembers]);

  const handleCreateGroup = async () => {
    setLoading(true);
    const userID = localStorage.getItem("userId");
    setIsValidGroup(groupName !== "" && addedMembers.length !== 0);
    if (groupName !== "" && addedMembers.length !== 0) {
      try {
        const endPoint = REACT_APP_apiHost + "/groups";
        const data = JSON.stringify({
          group_name: groupName,
          group_member_ids: [
            userID,
            ...addedMembers.map((member) => member.id),
          ],
        });
        const response = await callApi(endPoint, "POST", data);
        setGroups([
          ...groups,
          {
            group_name: response.group.group_name,
            members: response.group_members.map((members) => members.user_name),
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setGroupName("");
        setAddedMembers([]);
        setSearch("");
        setResults([]);
      }
    } else {
      setLoading(false);
    }
  };

  const addedMemberUsernames = addedMembers.map((member) => member.username);
  return (
    <Section headerName={"Create Group"}>
      <div className="groups-container">
        <div className="groups-name-container body-medium font-regular">
          <label className="groups-name-label">Group Name: </label>
          <input
            className={
              isValidGroup || groupName.length > 0
                ? "groups-name-input border border-black"
                : "groups-name-input bg-red-50 border border-red-300 text-red-900"
            }
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
          isLoading={loading}
          isError={!(isValidGroup || addedMemberUsernames.length > 0)}
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
          search={search}
          setSearch={setSearch}
          results={results}
          setResults={setResults}
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

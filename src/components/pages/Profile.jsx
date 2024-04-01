import { useState, useEffect } from "react";
import "../../styles/pages/Profile.css";
import Section from "../shared/Section";
import Friends from "../shared/Friends";
import Button from "../shared/Button";
import Groups from "../shared/Groups";
import AddTransactionButton from "../shared/AddTransactionButton";
import callApi from "../shared/callAPI";
import LoadingMessage from "../shared/LoadingMessage";

function Profile({ userId }) {
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileChange, setProfileChange] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const endpoint = process.env.REACT_APP_apiHost + `/profile/${userId}`;
        const response = await callApi(endpoint, "GET");

        setFriends(
          response.friends.map((friend) => {
            return {
              id: friend.user_id,
              name: `${friend.first_name} ${friend.last_name}`,
              username: friend.user_name,
              isFriend: true,
            };
          })
        );
        setGroups(response.groups);
        setFirstName(response.user.first_name);
        setLastName(response.user.last_name);
        setUsername(response.user.user_name);
        setBio(response.user.bio);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [profileChange, userId]);

  return (
    <>
      {loading && <LoadingMessage message="Loading..." />}
      <MyProfile
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        username={username}
        setUsername={setUsername}
        bio={bio}
        setBio={setBio}
        profileChange={profileChange}
        setProfileChange={setProfileChange}
        userId={userId}
        setLoading={setLoading}
      />
      <Section headerName="Friends">
        <Friends friends={friends} showFriend={true} showButton={false} />
      </Section>

      <Section headerName="Groups">
        <Groups groups={groups} />
      </Section>
      <AddTransactionButton userId={userId} />
    </>
  );
}

function MyProfile(props) {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    bio,
    setBio,
    profileChange,
    setProfileChange,
    userId,
    setLoading,
  } = props;
  const [isEdit, setIsEdit] = useState(false);

  const handleButtonClick = async () => {
    if (isEdit) {
      setLoading(true);
      try {
        const endPoint = process.env.REACT_APP_apiHost + `/user/${userId}`;
        const data = JSON.stringify({
          user_details: {
            first_name: firstName,
            last_name: lastName,
            user_name: username,
            bio: bio,
          },
        });
        await callApi(endPoint, "PUT", data);
        setProfileChange(profileChange + 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    setIsEdit(!isEdit);
  };

  return (
    <Section headerName="My Profile">
      <div className="profile-info-container">
        {isEdit ? (
          <>
            <div className="profile-info-edit">
              <label>First Name</label>
              <input
                className="profile-edit-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="profile-info-edit">
              <label>Last Name</label>
              <input
                className="profile-edit-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="profile-info-edit">
              <label>Username</label>
              <input
                className="profile-edit-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="profile-info-edit">
              <label>Bio</label>
              <textarea
                className="profile-edit-bio"
                type="text"
                value={bio}
                rows={5}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
          </>
        ) : (
          <>
            <div className="profile-info body-medium font-regular">{`${`${firstName} ${lastName}`} | @${username}`}</div>
            <div className="profile-info body-medium font-regular">{bio}</div>
          </>
        )}
      </div>
      <div
        className="profile-edit-container"
        onClick={() => handleButtonClick()}
      >
        <Button
          color={"blue"}
          text={isEdit ? "Save Profile" : "Edit Profile"}
        />
      </div>
    </Section>
  );
}

export default Profile;

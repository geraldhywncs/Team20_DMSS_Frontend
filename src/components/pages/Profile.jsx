import { useState } from "react";
import "../../styles/pages/Profile.css";
import Section from "../shared/Section";
import Friends from "../shared/Friends";
import Button from "../shared/Button";

function Profile() {
  const friends = [
    { name: "Jun Jie", username: "junjie", isFriend: true },
    { name: "Wei Jie", username: "weijie", isFriend: true },
    { name: "Jedrek", username: "jedrek", isFriend: true },
    { name: "Weii Zee", username: "weiizee", isFriend: false },
  ];
  const groups = [
    {
      name: "The Bois",
      usernames: ["junjie", "weijie", "jedrek", "weiizee"],
    },
    { name: "The Girls", usernames: ["girl1", "girl2", "girl3"] },
  ];
  return (
    <>
      <MyProfile />
      <Groups groups={groups} />
      <Section headerName="Friends">
        <Friends friends={friends} />
      </Section>
    </>
  );
}

function MyProfile() {
  const [name, setName] = useState("Gerald");
  const [username, setUsername] = useState("geraldhyw");
  const [bio, setBio] = useState(
    "Pastry sprinkles marzipan tiramisu ipsum marzipan. Cream ipsum tiramisu croissant cake tiramisu. Tiramisu orange croissant apple sweet cream. Biscuit marzipan tiramisu dolor croissant sprinkles."
  );
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Section headerName="My Profile">
      <div className="profile-info-container">
        {isEdit ? (
          <>
            <div className="profile-info-edit">
              <label>Name</label>
              <input
                className="profile-edit-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <div className="profile-info body-medium font-regular">{`${name} | @${username}`}</div>
            <div className="profile-info body-medium font-regular">{bio}</div>
          </>
        )}
      </div>
      <div
        className="profile-edit-container"
        onClick={() => setIsEdit(!isEdit)}
      >
        <Button
          color={"blue"}
          text={isEdit ? "Save Profile" : "Edit Profile"}
        />
      </div>
    </Section>
  );
}

function Groups(props) {
  const { groups } = props;
  return (
    <Section headerName="Groups">
      <div className="groups-container">
        {groups.map((group, index) => (
          <div className="group-container body-large font-medium" key={index}>
            {`${group.name} | ${group.usernames.map((username) => `@${username}`).join(", ")}`}
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Profile;

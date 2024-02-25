import React from "react";
import "../../styles/pages/Profile.css";
import Section from "./shared/Section";
import Friends from "./shared/Friends";

function Profile() {
  const friends = [
    { name: "Jun Jie", username: "junjie", isFriend: true },
    { name: "Wei Jie", username: "weijie", isFriend: true },
    { name: "Jedrek", username: "jedrek", isFriend: true },
    { name: "Weii Zee", username: "weiizee", isFriend: false },
  ];
  return (
    <>
      <MyProfile />
      <Section headerName={"Friends"}>
        <Friends friends={friends} />
      </Section>
      <Groups />
    </>
  );
}

function MyProfile() {
  const name = "Gerald";
  const username = "geraldhyw";
  const bio = `Pastry sprinkles marzipan tiramisu ipsum marzipan. Cream ipsum tiramisu croissant cake tiramisu. Tiramisu orange croissant apple sweet cream. Biscuit marzipan tiramisu dolor croissant sprinkles.`;
  return (
    <Section headerName={"My Profile"}>
      <div className="profile-info-container">
        <div className="profile-info body-medium font-regular">{`${name} | @${username}`}</div>
        <div className="profile-info body-medium font-regular">{bio}</div>
      </div>
    </Section>
  );
}

function Groups() {
  return (
    <Section headerName={"Groups"}>
      <div>test</div>
    </Section>
  );
}

export default Profile;

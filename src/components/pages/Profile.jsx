import React from "react";
import "../../styles/pages/Profile.css";
import Section from "./shared/Section";

function Profile() {
  return (
    <>
      <MyProfile />
      <Friends />
      <Groups />
    </>
  );
}

function MyProfile() {
  return (
    <Section headerName={"My Profile"}>
      <div>test</div>
    </Section>
  );
}

function Friends() {
  return (
    <Section headerName={"Friends"}>
      <div>test</div>
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

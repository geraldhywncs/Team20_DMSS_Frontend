import "../../App.css";

function Groups(props) {
  const { groups } = props;
  // const groups = [
  //   {
  //     name: "The Bois",
  //     usernames: ["junjie", "weijie", "jedrek", "weiizee"],
  //   },
  //   { name: "The Girls", usernames: ["girl1", "girl2", "girl3"] },
  // ];

  return (
    <div className="groups-container">
      {groups.map((group, index) => (
        <div className="group-container body-large font-medium" key={index}>
          {`${group.name} | ${group.usernames.map((username) => `@${username}`).join(", ")}`}
        </div>
      ))}
    </div>
  );
}

export default Groups;

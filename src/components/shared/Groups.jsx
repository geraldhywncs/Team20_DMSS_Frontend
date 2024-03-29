import "../../App.css";

function Groups(props) {
  const { groups } = props;

  return (
    <div className="groups-container">
      {groups.map((group, index) => (
        <div className="group-container body-large font-medium" key={index}>
          {`${group.group_name} | ${group.members.map((username) => `@${username}`).join(", ")}`}
        </div>
      ))}
    </div>
  );
}

export default Groups;

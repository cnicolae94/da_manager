import Button from "./button.component";
import "./button-container.styles.css";

const operations = [
  {
    id: 1,
    title: "Album",
  },
  {
    id: 2,
    title: "Create",
  },
  {
    id: 3,
    title: "Update",
  },
  {
    id: 4,
    title: "Delete",
  },
  {
    id: 5,
    title: "Search_by_ID",
  },
];

const ButtonContainer = () => {
  const mainButtonClass = "btn btn-outline-primary";
  return (
    <div className="button-container" key="butt-container">
      {operations.map((item) => {
        return (
          <Button
            type="button"
            id={item.id}
            title={item.title}
            classN={mainButtonClass}
            key={item.id}
          />
        );
      })}
    </div>
  );
};

export default ButtonContainer;

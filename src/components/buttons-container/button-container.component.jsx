import Button from "./button.component";

const operations = [
  {
    id: 1,
    title: "Create",
  },
  {
    id: 2,
    title: "Update",
  },
  {
    id: 3,
    title: "Delete",
  },
  {
    id: 4,
    title: "Search by ID",
  },
];

const ButtonContainer = () => {
  return (
    <div className="button-container">
      {operations.map((item) => {
        console.log(item.title);
        <Button id={item.id} title={item.title} />;
      })}
    </div>
  );
};

export default ButtonContainer;

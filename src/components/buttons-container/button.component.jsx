import { Link } from "react-router-dom";

const Button = (id, title) => {
  const path = `/${title}`;
  console.log("button succesfully generated");

  // <Link to={path}>
  // <button type="button" className="btn btn-outline-primary" key={id}>
  //     {title}
  // </button>
  // </Link>
  return (
    <button type="button" className="btn btn-outline-primary">
      {title}
    </button>
  );
};

export default Button;

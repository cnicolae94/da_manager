import { Link } from "react-router-dom";

const Button = ({ type, id, title, classN }) => {
  const lowercaseTitle = title.toLowerCase();
  const path = `/${lowercaseTitle}`;

  return (
    <Link to={path}>
      <button type={type} className={classN} key={id}>
        {title}
      </button>
    </Link>
  );
};

export default Button;

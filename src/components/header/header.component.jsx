import "./header.styles.css";
const { headerText } = require("../../assets/headers");

export const Header = () => {
  return <h1 className="app-header">{headerText}</h1>;
};

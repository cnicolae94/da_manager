import { Link, Outlet } from "react-router-dom";
import { AlbumContainer } from "../../components/artist-container/artist-container.component";
import ButtonContainer from "../../components/buttons-container/button-container.component";
import { Header } from "../../components/header/header.component";

const Home = () => {
  return (
    <div className="home-container">
      <Link to="/">
        <Header />
      </Link>
      <ButtonContainer />
      <Outlet />
    </div>
  );
};

export default Home;

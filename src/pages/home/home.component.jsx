import { Outlet } from "react-router-dom";
import { ArtistContainer } from "../../components/artist-container/artist-container.component";
import ButtonContainer from "../../components/buttons-container/button-container.component";
import { Header } from "../../components/header/header.component";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <ButtonContainer />
      <ArtistContainer />
      <Outlet />
    </div>
  );
};

export default Home;

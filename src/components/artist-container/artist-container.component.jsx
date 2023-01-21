import { useEffect, useState } from "react";

export const ArtistContainer = () => {
  const [artists, setArtists] = useState([]);

  async function getArtists() {
    try {
      const response = await fetch("http://localhost:8080/artists");
      const data = await response.json();
      setArtists(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getArtists();
  }, []);

  console.log(artists);

  return <div>This is a div that will be populated</div>;
};

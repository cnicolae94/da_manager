import { useState } from "react";
import {
  artistIdText,
  artistNameText,
  artistYOBText,
  createAnArtist,
  createAPainting,
  createText,
  paintingImageUrlText,
  paintingNameText,
} from "../../assets/headers";
import FormInput from "./_form-input.component";
import "./_form.styles.css";

const defaultArtist = {
  artistName: "",
  artistYOB: 0,
};

const defaultPainting = {
  paintingName: "",
  paintingURL: "",
  artistID: 0,
};

const CreateItemForm = () => {
  const [artist, setArtist] = useState(defaultArtist);
  const [painting, setPainting] = useState(defaultPainting);

  const { artistName, artistYOB } = artist;

  const onChangeArtist = (event) => {
    const { name, value } = event.target;
    setArtist({ ...artist, [name]: value });
  };
  const onChangePainting = (event) => {
    const { name, value } = event.target;
    setArtist({ ...painting, [name]: value });
  };

  const handleArtistSubmit = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:8080/artists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artistName: artist.artistName,
        artistDOB: artist.artistYOB,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    //setArtist(defaultArtist);
  };

  const handlePaintingSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="create-item-wrapper">
      <h1 className="create-header">{createText}</h1>
      <form className="artist-form-container input-group">
        <h4>{createAnArtist}</h4>
        <FormInput
          required
          type="text"
          displaytext={artistNameText}
          name="artistName"
          onChange={onChangeArtist}
        />
        <FormInput
          required
          type="text"
          displaytext={artistYOBText}
          name="artistYOB"
          onChange={onChangeArtist}
        />
        <button
          type="submit"
          className="btn btn-secondary submit"
          onSubmit={handleArtistSubmit}
        >
          Submit an artist
        </button>
      </form>
      <form className="paint-form-container input-group">
        <h4>{createAPainting}</h4>
        <FormInput
          required
          type="text"
          displaytext={paintingNameText}
          name="paintingName"
          onChange={onChangePainting}
        />
        <FormInput
          type="text"
          displaytext={paintingImageUrlText}
          name="paintingURL"
          onChange={onChangePainting}
        />
        <FormInput
          required
          type="text"
          displaytext={artistIdText}
          name="artistID"
          onChange={onChangePainting}
        />
        <button
          type="submit"
          className="btn btn-secondary submit"
          onSubmit={handlePaintingSubmit}
        >
          Submit a painting
        </button>
      </form>
    </div>
  );
};

export default CreateItemForm;

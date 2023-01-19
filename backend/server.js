const express = require("express");

const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const app = express();

//=======Sequelize setup

const database = "art";
const username = "root";
const password = "root";

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "postgres",
});

const Artist = sequelize.define(
  "artist",
  {
    artistId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    artistName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    artistDOB: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

const Painting = sequelize.define(
  "painting",
  {
    paintingId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    artistId: {
      type: Sequelize.INTEGER,
      references: {
        model: Artist,
        key: "artistId",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Artist.hasMany(Painting, { foreignKey: "artistId" });
Painting.belongsTo(Artist, { foreignKey: "artistId" });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize
  .sync()
  .then(() => {
    console.log("Models synced successfully.");
  })
  .catch((error) => {
    console.error("Error syncing models: ", error);
  });

export async function createArtist(artistName, artistDOB) {
  try {
    const newArtist = Artist.build({
      artistName: artistName,
      artistDOB: artistDOB,
    });
    await newArtist.save();
    console.log("Artist created successfully: ", newArtist);
  } catch (error) {
    console.error("Error creating artist: ", error);
  }
}

export async function createPainting(paintingId, title, artistId) {
  try {
    const newPainting = Painting.build({
      paintingId: paintingId,
      title: title,
      artistId: artistId,
    });
    await newPainting.save();
    console.log("Painting created successfully: ", newPainting);
  } catch (error) {
    console.error("Error creating artist: ", error);
  }
}

app.use(bodyParser.json());

// Get all artists
app.get("/artists", async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get artist by ID
app.get("/artists/:id", async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      res.status(404).json({ message: "Artist not found" });
    } else {
      res.json(artist);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new artist
app.post("/artists", async (req, res) => {
  try {
    const newArtist = await createArtist(
      req.body.artistName,
      req.body.artistDOB
    );
    res.status(201).json(newArtist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an artist
app.put("/artists/:id", async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      res.status(404).json({ message: "Artist not found" });
    } else {
      await artist.update(req.body);
      res.json(artist);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an artist
app.delete("/artists/:id", async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      res.status(404).json({ message: "Artist not found" });
    } else {
      await artist.destroy();
      res.json({ message: "Artist deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("REST API listening on port 3000");
});

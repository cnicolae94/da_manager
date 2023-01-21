const express = require("express");

const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const app = express();

const cors = require("cors");
app.use(cors());

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
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true,
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

async function createArtist(artistName, artistDOB) {
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

async function createPainting(paintingId, title, imageUrl, artistId) {
  try {
    const newPainting = Painting.build({
      paintingId: paintingId,
      title: title,
      imageUrl: imageUrl,
      artistId: artistId,
    });
    await newPainting.save();
    console.log("Painting created successfully: ", newPainting);
  } catch (error) {
    console.error("Error creating artist: ", error);
  }
}

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

app.use(bodyParser.json());

//============Artist CRUD ops============

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

//============Painting CRUD ops============

// Get all paintings

app.get("/paintings", async (req, res) => {
  try {
    const paintings = await Painting.findAll({
      include: [
        {
          model: Artist,
          attributes: ["artistName"],
        },
      ],
    });
    res.json(paintings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get painting by ID

app.get("/paintings/:id", async (req, res) => {
  try {
    const painting = await Painting.findByPk(req.params.id, {
      include: [
        {
          model: Artist,
          attributes: ["artistId"],
        },
      ],
    });
    if (!painting) {
      res.status(404).json({ message: "Painting not found" });
    } else {
      res.json(painting);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new painting

app.post("/paintings", async (req, res) => {
  try {
    const newPainting = await createPainting({
      paintingId: req.body.paintingId,
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      artistId: req.body.artistId,
    });
    res.status(201).json(newPainting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a painting

app.put("/paintings/:id", async (req, res) => {
  try {
    const painting = await Painting.findByPk(req.params.id);
    if (!painting) {
      res.status(404).json({ message: "Painting not found" });
    } else {
      await painting.update(req.body);
      res.json(painting);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a painting

app.delete("/paintings/:id", async (req, res) => {
  try {
    const painting = await Painting.findByPk(req.params.id);
    if (!painting) {
      res.status(404).json({ message: "Painting not found" });
    } else {
      await painting.destroy();
      res.json({ message: "Painting deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(8080, () => {
  console.log("REST API listening on port 8080");
});

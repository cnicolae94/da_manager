const Artist = sequelize.define("artist", {
  artist_name: Sequelize.STRING,
  artist_id: Sequelize.STRING,
  artist_dob: Sequelize.DATE,
});

const Painting = sequelize.define("painting", {
  title: Sequelize.STRING,
  medium: Sequelize.STRING,
  year: Sequelize.INTEGER,
});

Artist.hasMany(Painting);
Painting.belongsTo(Artist);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

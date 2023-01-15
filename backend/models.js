const User = sequelize.define("user", {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

const Post = sequelize.define("post", {
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
});

User.hasMany(Post);
Post.belongsTo(User);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

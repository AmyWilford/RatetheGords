const db = require('./connection');
const { Gord } = require('../models');

db.once('open', async () => {
  await Gord.deleteMany();

  const gordons = await Gord.insertMany([
    {
      name: "Gord Downie",
      img: "./assets/gord-downie.png",
      bio: "Singer-songwriter, activist, and frontman of Canaidan rock band The Tragically Hip, from Kingston Ontario.",
    },
    {
      name: "Gord Howe",
      img: "./assets/gordie-howe.png",
      bio: "Nicknamed Mr. Hockey, a professional ice hockey player from Floral, Saskatchewan. ",
    },
    {
      name: "Gord Lightfoot",
      img: "./assets/gordon-lightfoot.png",
      bio: "GordonLightfoot bio",
    },
    {
      name: "Ranger Gord",
      img: "./assets/ranger-gord.png",
      bio: "Ranger Gord bio",
    },
    {
      name: "Gord Johnson",
      img: "./assets/gordie-johnson.png",
      bio: "Bio Gordie Johnson",
    },
    {
      name: "Gord Martineau",
      img: "./assets/gord-martineau.png",
      bio: "Bio Gord Martineau",
    },
    {
      name: "Gordon",
      img: "./assets/gordon.png",
      bio: "Bio Gordon",
    },
    {
      name: "Gourd",
      img: "./assets/gord.png",
      bio: "Bio Gourd",
    },
  ]);

  console.log("gords seeded");
  process.exit();
});

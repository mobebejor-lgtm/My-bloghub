import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// In-memory array to store posts (no database)
let posts = [];
let postsID = 1;  // create new IDs



app.post("/submit", (req, res) => { 
  posts.push({                      //add a new post to the array
    id : postsID,
     title : req.body.title,        //what was typed in title
     content: req.body.content      // what was type in content
  });                                   
  postsID++;                        //increasd by 1 so next post get a different number
  res.redirect("/");                 // back  homepage
});

app.get("/", (req, res) => { 
  res.render("index.ejs", { posts: posts });  //  show the ejs page and  give the list of all posts
});

app.get("/edit/:id", (req, res) => { // when edit is clicked
  const id = Number(req.params.id);  //get the id number from URL
  const post = posts.find(poster => poster.id === id);  //find the posts with ID number 

  res.render("edit.ejs", { post });
});

app.post("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find(poster => poster.id === id);

  post.title = req.body.title;  //replace old title with the new one
  post.content = req.body.content; // replace old content with the new one

  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const id = Number(req.params.id);

  posts = posts.filter(poster => poster.id !== id);

  res.redirect("/");
});





app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


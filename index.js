const express = require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');

var _=require('lodash');

const blogs=[{
    title: "Blog Title 1",
    post: "etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum",
    name: "Author Name"
},{
    title: "Blog Title 2",
    post: "etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum",
    name: "Author Name"
},{
    title: "Blog Title 3",
    post: "etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum",
    name: "Author Name"
}]
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));

app.listen(4000,function(){
    console.log("Server set up at port 3000");
})

app.get("/",function(req,res){
    res.render("home",{
        blogs:blogs,
        length: blogs.length
    })
})

app.get("/posts/:postName",function(req,res)
{
  blogs.forEach(function(post)
  {
      
    if(_.lowerCase(req.params.postName)===_.lowerCase(post.title))
    {
        res.render("post",{postTitle: post.title, postContent:post.post,postAuthor:post.author
        });
      
    };
  })
});

app.get("/compose",function(req,res){
    res.render("compose");
})

app.post("/compose",function(req,res){
    const title = req.body.title;
    let post=req.body.post;
    const author=req.body.author;
    
    const newPost={
        title: title,
        post: post,
        author: author
    };

    blogs.push(newPost);
    console.log(blogs[blogs.length-1]);
    res.redirect("/");
})
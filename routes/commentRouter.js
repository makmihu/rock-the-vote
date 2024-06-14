const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/Comment')

commentRouter.get('/', async (req, res, next) => {  // Get All Comment
    try {
      const comments = await Comment.find()
      return res.status(200).send(comments)  
    } catch (err) {
      res.status(500)
      return next(err)    
    }
  })

commentRouter.post(('/:issueId'), async (req, res, next) => { //post Comment
  try {
    console.log(req.body)
    req.body.user = req.auth._id //Attach the user who posted
    req.body.issue = req.params.issueId //Link the comment to the issue
    req.body.username = req.auth.username //Add the username
    const newComment = new Comment(req.body)
    const savedComment = await newComment.save()
    return res.status(201).send(savedComment)
  } catch (err) {
    console.log(err)
    res.status(500)
    return next(err) 
  } 
})

module.exports = commentRouter
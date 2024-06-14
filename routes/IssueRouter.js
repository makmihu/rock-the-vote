const express = require("express")
const IssueRouter = express.Router()
const Issue = require('../models/Issue')

IssueRouter.route('/')
  .get(async (req, res, next) => {              // Get All Issues
    try {
      const issues = await Issue.find()
      return res.status(200).send(issues)  
    } catch (err) {
      res.status(500)
      return next(err)    
    }
  })
  .post(async (req, res, next) => {             // Add new Issue
    try {
      req.body.user = req.auth._id
      req.body.username = req.auth.username
      const newIssue = new Issue(req.body)
      const savedIssue = await newIssue.save()
      return res.status(201).send(savedIssue)
    } catch (err) {
      res.status(500)
      return next(err)    
    }
  })
 
IssueRouter.get("/user", async (req, res, next) =>{  // Get Issues by user Id 
  try {
    const issues = await Issue.find({ user: req.auth._id})
    return res.status(200).send(issues)
  } catch (err) {
    res.status(500)
    return next(err) 
  }
}) 

IssueRouter.route("/:issueId",)
  .delete( async (req, res, next) => {          // Delete Issue
    try {
      const deletedIssue = await Issue.findOneAndDelete(
        { _id: req.params.issueId, user: req.auth._id }
      )
      return res.status(200).send(`Successfully delete Issue: ${deletedIssue.title}`)
    } catch (err) {
      res.status(500)
      return next(err)
    }
  })
  .put( async (req, res, next) => {             // Update Issue
    try {
      const updatedIssue = await Issue.findOneAndUpdate(
        { _id: req.params.issueId, user: req.auth._id },
        req.body,
        { new: true }
      )
      return res.status(201).send(updatedIssue)
    } catch (err) {
      res.status(500)
      return next(err)      
    }
  })

IssueRouter.put('/upVote/:issueId', async (req, res, next) => { //upvote
  try {
    console.log(req.params.issueId)
    const updateIssue = await Issue.findOneAndUpdate(
      { _id: req.params.issueId },
      {
        $addToSet: { upvotes: req.auth._id },
        $pull: { downvotes: req.auth._id }
      },
      { new: true }
    )
    return res.status(201).send(updateIssue)
  } catch (err) {
    console.log(err)
    res.status(500)
    return next(err)  
  }
})

IssueRouter.put('/downVote/:issueId', async (req, res, next) => { //downvote
  try {
    const updateIssue = await Issue.findOneAndUpdate(
      { _id: req.params.issueId },
      {
        $addToSet: { downvotes: req.auth._id },
        $pull: { upvotes: req.auth._id }
      },
      { new: true }
    )
    return res.status(201).send(updateIssue)
  } catch (err) {
    res.status(500)
    return next(err)  
  }
})

module.exports = IssueRouter
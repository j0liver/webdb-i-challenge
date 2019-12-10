const express = require("express");

const { getAccount, updateAccount, newAccount, deleteAccount } = require('./accountHelpers')


const router = express.Router();

// return a list of posts from the database
router.get("/:id", (req, res) => {
    console.log(req.params.id)
    getAccount(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the posts" });
    });
});

router.get("/", (req, res) => {
    getAccount()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the posts" });
    });
});

// router.get("/:id", (req, res) => {
//   // select * from posts where id = req.params.id
//   knex
//     .select("*")
//     .from("posts")
//     // .where("id", "=", req.params.id)
//     .where({ id: req.params.id })
//     .first() // equivalent to posts[0]
//     .then(post => {
//       res.status(200).json(post);
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({ errorMessage: "Error getting the post" });
//     });
// });

router.post("/", (req, res) => {
  newAccount(req.body)
    .then(ids => {
      getAccount(ids[0])
        .then(account => {
          //Send new account back to client
          res.status(201).json(account);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            message: "Error getting account"
          });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error adding an account"
      });
    });
});

router.put("/:id", (req, res) => {
  updateAccount(req.params.id, req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record(s) updated` });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error updating the post"
      });
    });
});

router.delete("/:id", (req, res) => {
  deleteAccount(req.params.id)
    .then(count => {
      res.status(200).json({ message: `${count} record(s) removed` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error removing the post"
      });
    });
});

module.exports = router;

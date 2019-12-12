const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  var data = req.app.get('data');
  //var item = data[req.params.id];
  var id = req.params.id;
  id=id.split(":id")[1];
  console.log(id);
  res.render('poemList', {
    message: id
  });
});

module.exports=router;
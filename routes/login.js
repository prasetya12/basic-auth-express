var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');


const TOKEN = process.env.ACCESS_TOKEN

const users = [
  {
    username:'admin',
    passwrod:'admin123'
  }
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('responda with a resource');
  console.log(TOKEN);
});

router.post('/',function(req,res, next){
  const {username, password} = req.body;

  const user = users.find(u=> {return u.username === username && u.passwrod === password} );

  if(user){
    const accessToken= jwt.sign({username:user.username, password:user.password}, TOKEN)

    res.json({
      accessToken
    })
  }else{
    res.status(400).send('username not found')
  }
})

module.exports = router;

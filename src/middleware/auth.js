const jwt = require('jsonwebtoken');
const user = require('../../DB/user');

const auth = async (req,res,next) => {
  try{
    const token = req.header('Authorization').replace('Bearer ','');
    const decoded = jwt.verify(token,'thisismytoken')
    const pUser = await user.findOne({'_id':decoded._id,'tokens.token' :token})
    if(!pUser) throw new Error();
    // console.log(pUser);
    req.token=token;
    req.User=pUser;
    next();

  }catch(e){
    res.send('Your are not Authorized');
  }

}

module.exports = auth;
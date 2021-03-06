const express = require('express');
const userModel = require.main.require('./models/userModel.js');
const router = express.Router();

router.get('/', (req, res)=>{
user={
    username:req.cookies['uname']
}
//console.log(user)
userModel.getuserbyid(user, function(result){
    //console.log(result)
    if (result.length>0){
        res.render('ChangePass/index.ejs',{user:result})
    }
})
	
})
router.post('/', (req, res)=>{
user={
    username:req.body.username,
    pass:req.body.newpassword
}
userModel.updatepass(user, function(result){
    if(result){
        req.session.uname = null;
        res.clearCookie('uname');
        res.clearCookie('usertype');
        res.redirect('/login');
    }
    else{
        console.log ("else")
        req.session.uname = null;
        res.clearCookie('uname');
        res.clearCookie('usertype');
        res.redirect('/login');
    }
})

})

module.exports = router;
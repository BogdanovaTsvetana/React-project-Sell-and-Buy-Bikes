function isUser() {            
    return (req, res, next) => {
        if (req.user) {
           
            next();
        } else {
            res.redirect('/user/login');
        }
    }
}

function isGuest() {          
    return (req, res, next) => {
        if ( !req.user ) {
            next();
        } else {
            res.redirect('/');          // TODO change route
        }
    }
}



module.exports = {
    isUser,
    isGuest,
 
}
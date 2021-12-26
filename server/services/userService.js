// all is written at first step
const User = require('../models/User.js');
const Conversation = require('../models/Conversation.js');
const Message = require('../models/Message.js');
const { getConversationById } = require('../services/conversationService.js')
const bcrypt = require('bcrypt');    // 1
const jwt = require('jsonwebtoken');                  // 1
const { TOKEN_SECRET } = require('../config/index.js');  // 1

async function register({username, email, password, memberSince, location}) {        // TODO

    const pattern = new RegExp(`^${username}$`, 'i')
    const existUsermane =  await User.findOne({ username: { $regex: pattern} });
    const existEmail = await User.findOne({ email });
    
        if (existUsermane) {
            const err = new Error('Username is taken!');
            err.status = 409;
            throw err;
        } else if (existEmail) {
            const err = new Error('Email is taken!');
            err.status = 409;
            throw err;
        }

    const hashedPassword = await bcrypt.hash(password, 10);
             
    const user = new User({
        username,
        email,                   // TODO
        hashedPassword,
        memberSince,
        location,
    });

    await user.save();

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        accessToken: generateToken(user)
    } 
}

function generateToken(user) {    // 1
    const token = jwt.sign({
        _id: user._id,          
        username: user.username,
        email: user.email,
    }, TOKEN_SECRET); 
    
    //console.log(token)
    return token
}

async function login(username, password){
    const pattern = new RegExp(`^${username}$`, 'i')
    const user =  await User.findOne({ username: { $regex: pattern} });

    if( !user ) {
        const err = new Error('Incorrect username or password!');
        err.status = 401;  // Unauthorized
        throw err;
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        const err = new Error('Incorrect username or password');
        err.status = 401;  // Unauthorized
        throw err;
    }

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        accessToken: generateToken(user)
    } 

}

async function editUser(username, newData) {        // TODO
    const pattern = new RegExp(`^${username}$`, 'i')
    const user =  await User.findOne({ username: { $regex: pattern} });
    console.log('>> in editUser')
    //console.log(user)
    
    if(!user) {
        throw new Error('No such user in database!')
    }

    Object.assign(user, newData);

    await user.save();
    return user;
}

async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i')
    const user =  await User.findOne({ username: { $regex: pattern} }).lean();
    
    if (user && (user.conversations.length > 0) ) {
        let conversations = user.conversations;

        let convPopulated = [];
        for(let i = 0; i < conversations.length; i++) {
            let conv = await getConversationById(conversations[i]);
            convPopulated.push(conv)
        }

    user.conversations = convPopulated;
    }
   
    //console.log('in userservice getUserByUsername:')
    //console.log(user)
    return user;
   
}


async function getUserByEmail(email) {               // TODO
    const pattern = new RegExp(`^${email}$`, 'i')
    const user =  await User.findOne({ email: { $regex: pattern} });  // find returns array
    return user;
  
}


module.exports = {
    register,
    login,
    editUser,
    getUserByUsername,
    getUserByEmail,          // TODO
    
}
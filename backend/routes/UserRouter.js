const express =require("express") ;
const {
    registerUser,
    getAllUser
} =require("../controllers/UserControntroller.js") ;
const routerUser = express.Router();

routerUser.post('/api/register', registerUser);
routerUser.get('/api/getall',getAllUser);
module.exports = { 
    routerUser,
};

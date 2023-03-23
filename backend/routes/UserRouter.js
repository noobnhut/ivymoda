const express =require("express") ;
const {
    registerUser,
    loginUser,
    getAllUser,
    addUser
} =require("../controllers/UserControntroller.js") ;
const routerUser = express.Router();

routerUser.post('/api/register', registerUser);
routerUser.post('/api/login', loginUser);
routerUser.get('/api/getall',getAllUser);
routerUser.post('/api/adduser',addUser);

module.exports = { 
    routerUser,
};

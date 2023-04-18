const express =require("express") ;
const {
    registerUser,
    loginUser,
    getAllUser,
    getUserById,
    updateUserById
} =require("../controllers/UserControntroller.js") ;
const routerUser = express.Router();

routerUser.post('/api/register', registerUser);
routerUser.post('/api/login', loginUser);
routerUser.get('/api/getall',getAllUser);
routerUser.get('/api/getUserById/:id',getUserById);
routerUser.put('/api/updateUserById/:id', updateUserById);
module.exports = { 
    routerUser,
};

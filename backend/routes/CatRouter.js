const express =require("express") ;
const {
    getAllCat,
    addCat
} =require("../controllers/CatControntroller.js") ;
const routerCat = express.Router();

routerCat.get('/api/getcat',getAllCat);
routerCat.post('/api/addcat',addCat);


module.exports = { 
    routerCat,
};

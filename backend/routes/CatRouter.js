const express =require("express") ;
const {
    getAllCat
} =require("../controllers/CatControntroller.js") ;
const routerCat = express.Router();

routerCat.get('/api/getcat',getAllCat);

module.exports = { 
    routerCat
};

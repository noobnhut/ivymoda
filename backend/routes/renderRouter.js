const express =require("express") ;
const {
    renderProduct,
} =require("../controllers/renderController.js") ;
const routerRender = express.Router();
routerRender.get('/api/renderProduct',renderProduct);



module.exports = { 
    routerRender,   
};

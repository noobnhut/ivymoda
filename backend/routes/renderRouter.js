const express =require("express") ;
const {
    renderProduct,
    renderColor
} =require("../controllers/renderController.js") ;
const routerRender = express.Router();
routerRender.get('/api/renderProduct',renderProduct);
routerRender.get('/api/renderColor',renderColor);



module.exports = { 
    routerRender,   
};

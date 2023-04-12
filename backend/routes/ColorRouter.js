const express =require("express") ;
const {
    getColor,
    addColor,
    deleteColor,
    updateColor
} =require("../controllers/ColorController.js") ;
const routerColor = express.Router();

routerColor.get('/api/getColor/:id',getColor);
routerColor.post('/api/addColor',addColor);
routerColor.delete('/api/deleteColor/:id',deleteColor);
routerColor.put('/api/updateColor/:id',updateColor);


module.exports = { 
    routerColor,
};

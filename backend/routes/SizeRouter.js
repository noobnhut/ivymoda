const express =require("express") ;
const {
    getSize,
    addSize,
    deleteSize,
    updateSize
} =require("../controllers/SizeController.js") ;
const routerSize = express.Router();

routerSize.get('/api/getSize/:id',getSize);
routerSize.post('/api/addSize',addSize);
routerSize.delete('/api/deleteSize/:id',deleteSize);
routerSize.put('/api/updateSize/:id',updateSize);


module.exports = { 
    routerSize,
};

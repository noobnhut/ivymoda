const express =require("express") ;
const {
    getCatSex,
    addCatSex,
    deleteCatSex,
    updateCatSex
} =require("../controllers/CatSexController.js") ;
const routerCatSex = express.Router();

routerCatSex.get('/api/getCatSex',getCatSex);
routerCatSex.post('/api/addCatSex',addCatSex);
routerCatSex.put('/api/updateCatSex/:id',updateCatSex);
routerCatSex.delete('/api/deleteCatSex/:id',deleteCatSex);
module.exports = { 
    routerCatSex,
    
};

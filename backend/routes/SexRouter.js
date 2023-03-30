const express =require("express") ;
const {
    getAllSex,
    addSex,  
    updateSex,
    deleteSex
} =require("../controllers/SexController.js") ;
const routerSex = express.Router();

routerSex.get('/api/getsex',getAllSex);
routerSex.post('/api/addSex',addSex);
routerSex.put('/api/updateSex/:id',updateSex);
routerSex.delete('/api/deleteSex/:id',deleteSex);
module.exports = { 
    routerSex,
    
};

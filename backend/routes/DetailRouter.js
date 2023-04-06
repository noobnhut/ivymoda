const express =require("express") ;
const {
    getDetail,
    addDetail,
    updateDetail,
    deleteDetail
} =require("../controllers/DetailController.js") ;
const routerDetail = express.Router();

routerDetail.get('/api/getDetail/:id',getDetail);
routerDetail.post('/api/addDetail',addDetail);
routerDetail.put('/api/updateDetail/:id',updateDetail);
routerDetail.delete('/api/deleteDetail/:id',deleteDetail);


module.exports = { 
    routerDetail,
    
};
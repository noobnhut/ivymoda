const express =require("express") ;
const {
    getDetail,
    addDetail
} =require("../controllers/DetailController.js") ;
const routerDetail = express.Router();

routerDetail.get('/api/getDetail/:id',getDetail);
routerDetail.post('/api/addDetail',addDetail);

module.exports = { 
    routerDetail,
    
};
const express =require("express");
const {  
    addImg,
    deleteImg,
    updateImg,
    getImg
} =require("../controllers/ImageController.js") ;
const routerImg = express.Router();
routerImg.get('/api/getImg/:id',getImg);
routerImg.post('/api/addImg',addImg);
routerImg.put('/api/updateImg/:id',updateImg);
routerImg.delete('/api/deleteImg/:id',deleteImg);
module.exports = { 
    routerImg,
};

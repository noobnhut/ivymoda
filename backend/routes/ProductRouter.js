const express =require("express") ;
const {
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct
} =require("../controllers/ProductController.js") ;
const routerProduct = express.Router();

routerProduct.get('/api/getProduct',getProduct);
routerProduct.post('/api/addProduct',addProduct);
routerProduct.put('/api/updateProduct/:id',updateProduct);
routerProduct.delete('/api/deleteProduct/:id',deleteProduct);
module.exports = { 
    routerProduct,   
};

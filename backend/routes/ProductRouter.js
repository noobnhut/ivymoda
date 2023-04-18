const express =require("express") ;
const {
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct,
    searchProduct
  
} =require("../controllers/ProductController.js") ;
const routerProduct = express.Router();

routerProduct.get('/api/getProduct',getProduct);
routerProduct.post('/api/addProduct',addProduct);
routerProduct.put('/api/updateProduct/:id',updateProduct);
routerProduct.delete('/api/deleteProduct/:id',deleteProduct);
routerProduct.get('/api/search', searchProduct);
module.exports = { 
    routerProduct,   
};

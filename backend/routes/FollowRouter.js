const express =require("express") ;
const {
    productlike,
    productseen,
    renderlike,
    renderseen

} =require("../controllers/FollowController") ;
const routerFollow = express.Router();

routerFollow.post('/api/addlike',productlike);
routerFollow.post('/api/addseen',productseen);
routerFollow.get('/api/getlike/:id',renderlike);
routerFollow.get('/api/getseen/:id',renderseen);




module.exports = { 
    routerFollow,
};

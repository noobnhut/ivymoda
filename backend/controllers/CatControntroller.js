const db = require('../models');
const Cat = db.category;


// get all category

const getAllCat = async(req, res) => {
    try {
        const Cat = await Cat.findAll();
        res.json(Cat);
    } catch (error) {
        res.json("không lấy được danh mục");
        console.log(error);
    }  
};


//xuat 

module.exports = { 
    getAllCat
      
};

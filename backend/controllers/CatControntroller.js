const db = require('../models');
const Cat = db.Categories;


// get all category

const getAllCat = async(req, res) => {
    try {
        const cat = await Cat.findAll();
        res.json(cat);
    } catch (error) {
        res.json("không lấy được danh mục ");
        console.log(error);
    }  
};


const addCat = async (req, res) => 
{
    try {
        const {id,cat_name} = req.body;
        if (cat_name==null) {
            res.json({ message: "Thiếu thông tin danh mục" });
            return;
        } 
        else
        {
            const cat = await Cat.create( {id,cat_name} );
            res.json(cat);
            res.status(200).json({ msg: "Thêm loại sản phẩm thành công" });
        }
    } catch (error) {
        console.log(error);
        res.json({ message: "Không thể thêm danh mục" });
    }

}

module.exports = { 
    getAllCat,
    addCat
      
};

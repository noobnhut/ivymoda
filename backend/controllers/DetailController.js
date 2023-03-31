const db = require('../models');
const Product = db.Products;
const Detail = db.ProductDetails;
const path = require('path');
const multer = require('multer');
const getDetail = async (req, res) => {
    const detail = await Detail.findOne({ where: { id_product: req.params.id } });
    if (!detail) {
        return res.status(404).json({ message: "không tìm thấy dữ liệu" });
    }
    try {
        const details = await Detail.findAll({
            attributes: ['id', 'id_product', 'color', 'color_code', 'size', 'quantity', 'avatar', 'url'],
            include: [
              {
                model: Product,
                as: 'Products',
                where: { id: req.params.id },
              },
            ],
            raw: true,
            nest: true
          });
          const result = details.map(details => ({
            id: details.id,    
            color:details.color,
            size:details.size,
            quantity:details.quantity,
            url:details.url ,
            avatar:details.avatar
        }));
        res.json(result);
    }
    catch (error) {
        res.json("không lấy được chi tiết sản phẩm ");
        console.log(error);
    }
}
  
  // Hàm thêm chi tiết sản phẩm
const addDetail = async (req, res) => {

    const { id_product, color, color_code, size, quantity ,avatar} = req.body;
    const avatar_get= avatar;
    let url = `https://localhost:3000/${avatar}`
    const detail = await Detail.create({ id_product, color, color_code, size, quantity ,avatar,url });
    return res.status(201).json({ message: "Thêm chi tiết sản phẩm xong" });
  }
module.exports = {
    getDetail,
    addDetail
}
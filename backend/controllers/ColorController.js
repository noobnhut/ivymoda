const db = require('../models');
const Color = db.colors;
const Products = db.Products;
const Img = db.Imgs;
const Size = db.size;
const getColor = async (req, res) => {
    const id_product = req.params.id;
    const existProduct = await Color.findOne({ where: { id_product: id_product } });
    try {
        if (existProduct) {
            const color = await Color.findAll(
                {
                    attributes: ['id', 'id_product', 'color_code', 'color', 'detail_product'],
                    include: [
                        {
                            model: Products, attributes: ['id', 'name'],
                            where: { id: id_product }
                        }
                    ],
                    raw: true,
                    nest: true
                }
            );
            res.status(200).json(color);
        } else {
            res.status(404).json("Không tồn tại sản phẩm");
        }

    } catch (error) {
        res.status(404).json("không lấy được màu ");

    }
}

const addColor = async (req, res) => {
    const { id_product, color_code, color, detail_product } = req.body;
    const existProduct = await Products.findOne({ where: { id: id_product } });
    const exitsColor = await Color.findOne({ where: { color_code: color_code, color: color } })
    try {

        if (existProduct) {
            if (color_code == ''|| color == ''|| detail_product == '') {
                res.status(202).json({ message: "Thiếu thông tin nhập vào" });
                return;
            }
            else if (exitsColor) {
                res.status(202).json({ message: "Tồn tại màu trong hệ thống" });
                return;
            }
            else {
                const colors = await Color.create({ id_product, color_code, color, detail_product });
                res.status(202).json({ message: "Thêm thành công" });
            }
        }
        else {
            res.status(404).json({ message:"Không tồn tại sản phẩm "});
        }
    } catch (error) {
        res.status(404).json("Thêm thất bại ");
    }

}

const updateColor = async (req,res)=>
{ 
    const { id_product, color_code, color, detail_product } = req.body;
    const colors = await Color.findOne({ where: {id: req.params.id} });
    const existProduct = await Products.findOne({ where: { id: id_product } });
    const exitsColor = await Color.findOne({ where: { color_code: color_code, color: color } })
    if (!colors) return res.status(404).json({ message: "Không tìm thấy dữ liệu nào" });
    try {
        
       if(existProduct)
        {
            if (color_code == ''|| color == ''|| detail_product == '') {
               return res.status(202).json({ message: "Thiếu thông tin nhập vào" });
                
            }
            else if (exitsColor && exitsColor.id != req.params.id) {
              return  res.status(202).json({ message: "Tồn tại màu trong hệ thống" });
                
            }
            else
            {
                await Color.update({color_code, color, detail_product}, { where: { id: req.params.id } });
                res.status(200).json({ message: "Cập nhật thành công" });
            }
        }
    } catch (error) {
        
    }
   

}

const deleteColor = async (req, res) => {
   
    try {
        const colors = await Color.findOne({ where: {id: req.params.id} });
        const existImg = await Img.findOne({where:{id_color:req.params.id}});
        const existSize = await Size.findOne({where:{id_color:req.params.id}});

        if (!colors) return res.status(404).json({ message: "Không tìm thấy dữ liệu nào" });
        else if(existImg)
        {
        res.status(202).json({ message: "Tồn tại ảnh không thể xóa" });

        }
        else if(existSize)
        {
        res.status(202).json({ message: "Tồn tại size không thể xóa" });

        }
        else
        {
            await Color.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: "Xóa thành công" });
        }
        
    } catch (error) {
        console.log(error.message);
    }
}
module.exports =
{
    getColor,
    addColor,
    deleteColor,
    updateColor
}
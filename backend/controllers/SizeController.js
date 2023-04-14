const db = require('../models');
const Size = db.size;
const Color = db.colors;

const getSize = async (req, res) => {
  const id_color = req.params.id;
  const exitsColor = await Size.findOne({ where: { id_color: id_color } })
  try {
    const size = await Size.findAll(
      {
        attributes: ['id', 'id_color', 'size', 'quantity'],
        include: [
          {
            model: Color, attributes: ['id', 'color', 'color_code'],
            where: { id: id_color}
          }
        ],
        raw: true,
        nest: true
      }
    );
    res.status(200).json(size);
  } catch (error) {
    res.status(404).json("Không lấy được size ");
  }
}
const addSize = async (req, res) => {
  const { id_color, size, quantity } = req.body;
  const existSize = await Size.findOne({ where: { size: size ,id_color:id_color} });
  const existColor = await Color.findOne({ where: { id: id_color } });

  try {
    if (existColor) {
      if (size == '' || quantity == '') {
        return res.status(202).json({ message: "Không được để trống" });     
      }
      else if(isNaN(quantity))
      {
        return res.status(202).json({ message: "Số lượng nhập sai" });
      }
      if(existSize)
      {
        return res.status(202).json({ existSize,message: "Tồn tại size" });
      }
      else
      {
           const sizes = await Size.create({id_color, size, quantity});
           return res.status(202).json({message: "Thêm thành công" });
      }
    } else {
      res.status(200).json({ message: "Không tồn tại màu" });

    }
  } catch (error) {
    res.status(404).json("Không thêm được size ");

  }
}
const deleteSize = async (req, res) => {  
  try {
      const size = await Size.findOne({ where: {id: req.params.id} });
      if (!size) return res.status(404).json({ message: "Không tìm thấy dữ liệu nào" });
      else
      {
          await Size.destroy({
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
const updateSize = async (req,res)=>
{
  const { id_color, size, quantity } = req.body;
  const existSize = await Size.findOne({ where: { size: size } });
  const existColor = await Color.findOne({ where: { id: id_color } });

  try {
    if (existColor) {
      if (size == '' || quantity == '') {
        return res.status(202).json({ message: "Không được để trống" });     
      }
      else if(isNaN(quantity))
      {
        return res.status(202).json({ message: "Số lượng nhập sai" });
      }
      else
      {
           const sizes = await Size.update({id_color, size, quantity},{where:{id:req.params.id}});
           return res.status(202).json({ message: "Sửa thành công" });
      }
    } else {
      res.status(200).json({ message: "Không tồn tại màu" });

    }
  } catch (error) {
    res.status(404).json("Không thêm được size ");

  }
}
module.exports =
{
  getSize,
  addSize,
  deleteSize,
  updateSize
}
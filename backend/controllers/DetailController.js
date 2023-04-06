const db = require('../models');
const Product = db.Products;
const Detail = db.ProductDetails;
const multer = require('multer');
const fs = require('fs');
const getDetail = async (req, res) => {
  const detail = await Detail.findOne({ where: { id_product: req.params.id } });
  if (!detail) {
    return res.status(404).json({ message: "không tìm thấy dữ liệu " });
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
      color: details.color,
      color_code: details.color_code,
      size: details.size,
      quantity: details.quantity,
      url: details.url,
      avatar: details.avatar
    }));
    res.json(result);
  }
  catch (error) {
    return res.status(404).json({ message: "không tìm thấy dữ liệu " });

  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // giới hạn dung lượng file 100MB
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      cb(new Error('Định dạng file không hợp lệ'));
    } else {
      cb(null, true);
    }
  }
});

const addDetail = async (req, res) => {
  try {
    upload.single('avatar')(req, res, async function (err) {
      const { id_product, color, color_code, size, quantity } = req.body;
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Nếu không có file ảnh được chọn
      if (!req.file) {
        return res.status(400).json({ error: 'Vui lòng chọn ảnh đại diện' });
      }

      const imagePath = req.file.path;
      const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;

      if (color == '' || color_code == '' || size == '' || quantity == '' || id_product == '') {
        return res.status(400).json({ error: 'Vui lòng nhập đủ thông tin' });
      }
      else {
        const details = await Detail.create({
          id_product, color, color_code, size, quantity,
          avatar: req.file.filename,
          url: imageUrl,
        });
        return res.status(201).json({message:"add thành công" });
      }

    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Lỗi server' });
  }
}

const updateDetail = async (req, res) => {
  try {
    upload.single('avatar')(req, res, async function (err) {
      const id = req.params.id;
      const { id_product, color, color_code, size, quantity } = req.body;
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
      
      const detail = await Detail.findByPk(id);

      if (!detail) {
        return res.status(404).json({ error: 'Không tìm thấy chi tiết sản phẩm' });
      }
      
      // Kiểm tra nếu có file ảnh mới được chọn
      if (req.file) {
        const imagePath = req.file.path;
        const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
  
        // Xóa ảnh cũ trên server
        fs.unlinkSync(`./uploads/${detail.avatar}`);
  
        // Cập nhật thông tin mới cho chi tiết sản phẩm
        detail.color = color;
        detail.color_code = color_code;
        detail.size = size;
        detail.quantity = quantity;
        detail.id_product = id_product;
        detail.avatar = req.file.filename;
        detail.url = imageUrl;
  
        await detail.save();
      } else {
        // Không có file ảnh mới được chọn, chỉ cập nhật thông tin
        detail.color = color;
        detail.color_code = color_code;
        detail.size = size;
        detail.quantity = quantity;
        detail.id_product = id_product; 
        await detail.save();
      }
  
      return res.status(200).json({ success: true, detail });
      });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Lỗi server' });
  }
}

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`File ${filePath} has been deleted`);
  });
}

const deleteDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const detail = await Detail.findByPk(id);

    if (!detail) {
      return res.status(404).json({ error: 'Không tìm thấy chi tiết' });
    }

    const imagePath = `./uploads/${detail.avatar}`;
    deleteFile(imagePath);

    await detail.destroy();

    return res.status(200).json({ success: true, message: 'Xóa thành công' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Xóa thất bại' });
  }
}

module.exports = {
  getDetail,
  addDetail,
  updateDetail,
  deleteDetail
}
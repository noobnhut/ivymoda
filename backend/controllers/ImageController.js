const db = require('../models');
const Size = db.size;
const Img = db.Imgs;
const Color = db.colors;
const multer = require('multer');
const fs = require('fs');
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
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif|jfif)$/)) {
        cb(new Error('Định dạng file không hợp lệ'));
      } else {
        cb(null, true);
      }
    }
  });
  
const getImg = async (req,res)=>{
  const id_color = req.params.id;
  const existcolor = await Img.findOne({ where: { id_color: id_color } });
  try {
      if (existcolor) {
          const img = await Img.findAll(
              {
                  attributes: ['id', 'id_color', 'avatar','url'],
                  include: [
                      {
                          model: Color, attributes: ['id', 'color','color_code'],
                          where: { id: id_color }
                      }
                  ],
                  raw: true,
                  nest: true
              }
          );
          res.status(200).json(img);
      } else {
          res.status(404).json("Không tồn tại màu");
      }

  } catch (error) {
      res.status(404).json("không lấy được ảnh ");

  }
}
  const addImg = async (req, res) => {
    try {
      upload.array('avatar', 10)(req, res, async function (err) {
        const { id_color } = req.body;
        if (err instanceof multer.MulterError) {
          return res.status(400).json({message: err.message });
        } else if (err) {
          return res.status(400).json({message: err.message });
        }
  
        // Nếu không có file ảnh được chọn
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({message: 'Vui lòng chọn ít nhất một ảnh đại diện' });
        }
  
        const imgs = [];
  
        for (let i = 0; i < req.files.length; i++) {
          const imagePath = req.files[i].path;
          const imageUrl = `${req.protocol}://${req.get('host')}/${req.files[i].filename}`;
  
          const img = await Img.create({
            id_color,
            avatar: req.files[i].filename,
            url: imageUrl,
          });
  
          imgs.push(img);
        }
  
        return res.status(201).json({ message: "Thêm ảnh thành công", imgs });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: 'Lỗi server' });
    }
  };

  const updateImg = async (req, res) => {
    try {
      upload.single('avatar')(req, res, async function (err) {
        const id = req.params.id;
        const { id_color } = req.body;
        if (err instanceof multer.MulterError) {
          return res.status(400).json({message: err.message });
        } else if (err) {
          return res.status(400).json({message: err.message });
        }
  
        const img = await Img.findByPk(id);
  
        if (!img) {
          return res.status(404).json({message: 'Không tìm thấy màu sắc' });
        }
  
        // Kiểm tra nếu có file ảnh mới được chọn
        if (req.file) {
          const imagePath = req.file.path;
          const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
  
          // Xóa ảnh cũ trên server
          fs.unlinkSync(`./uploads/${img.avatar}`);
  
          // Cập nhật thông tin mới cho chi tiết sản phẩm
          img.id_color = id_color;
          img.avatar = req.file.filename;
          img.url = imageUrl;
          await img.save();
        } else {
          // Không có file ảnh mới được chọn, chỉ cập nhật thông tin
          img.id_color = id_color;
          await img.save();
        }
  
        return res.status(200).json({ success: true, img });
        });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: 'Lỗi server' });
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
 
  const deleteImg = async (req, res) => {
    try {
      const id = req.params.id;
      const img = await Img.findByPk(id);
  
      if (!img) {
        return res.status(404).json({ error: 'Không tìm thấy chi tiết' });
      }
  
      const imagePath = `./uploads/${img.avatar}`;
      deleteFile(imagePath);
  
      await img.destroy();
  
      return res.status(200).json({ success: true, message: 'Xóa thành công' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Xóa thất bại' });
    }
  }


module.exports = {
    addImg,
    deleteImg,
    updateImg,
    getImg
};
const db = require('../models');
const Cat = db.Categories;

const getAllCat = async (req, res) => {
    try {
        const cat = await Cat.findAll();
        res.json(cat);
    } catch (error) {
        res.json("không lấy được danh mục ");
        console.log(error);
    }
};

const addCat = async (req, res) => {

    try {
        const { cat_name } = req.body;

        const existingCat = await Cat.findOne({ where: { cat_name } });
        if (cat_name == '') {
            res.status(202).json({ message: "Thiếu thông tin danh mục" });
            return;
        }
        else if (existingCat) {
            return res.status(203).json({ message: 'Danh mục đã tồn tại trong hệ thống' });
        }
        else {
            const cat = await Cat.create({ cat_name });
            return res.status(201).json({ message: "Thêm thông tin danh mục xong" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Không thể thêm danh mục" });
    }

}

const updateCat = async (req, res) => {
    const cat = await Cat.findOne({ where: { id: req.params.id } });
    if (!cat) return res.status(404).json({ message: "Không tìm thấy dữ liệu" });

    const { cat_name } = req.body;

    try {
        const existingCat = await Cat.findOne({ where: { cat_name } });
        if (cat_name == '') {
            res.status(201).json({ message: "Dữ liệu không thể rỗng" });
        }
        else if (existingCat) {
            return res.status(203).json({ message: 'Danh mục đã tồn tại trong hệ thống' });
        }
        else {
            await Cat.update({ cat_name }, { where: { id: req.params.id } });
            res.status(200).json({ message: "Cập nhật thành công" });
        }

    } catch (error) {
        return res.status(401).json({ message: "Không thể câp nhập danh mục" });
    }
};

const deleteCat = async (req, res) => {
    const cat = await Cat.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!cat) return res.status(404).json({ message: "Không tìm thấy dữ liệu nào" });

    try {
        await Cat.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: "Xóa danh mục thành công" });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    getAllCat,
    addCat,
    updateCat,
    deleteCat
};

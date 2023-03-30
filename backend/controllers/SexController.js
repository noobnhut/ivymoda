const db = require('../models');
const Sex = db.Sexes;

const getAllSex = async (req, res) => {
    try {
        const sex = await Sex.findAll();
        res.json(sex);
    } catch (error) {
        res.json("không lấy được đối tượng ");
        console.log(error);
    }
};

const addSex = async (req, res) => {

    try {
        const { Sexes_value } = req.body;

        const existingSex = await Sex.findOne({ where: { Sexes_value } });
        if (Sexes_value == '') {
            res.status(202).json({ message: "Thiếu thông tin đối tượng" });
            return;
        }
        else if (existingSex) {
            return res.status(203).json({ message: 'đối tượng đã tồn tại trong hệ thống' });
        }
        else {
            const sex = await Sex.create({ Sexes_value });
            return res.status(201).json({ message: "Thêm thông tin đối tượng xong" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Không thể thêm đối tượng" });
    }

}

const updateSex = async (req, res) => {
    const sex = await Sex.findOne({ where: { id: req.params.id } });
    if (!sex) return res.status(404).json({ message: "Không tìm thấy dữ liệu" });

    const { Sexes_value } = req.body;

    try {
        const existingSex = await Sex.findOne({ where: { Sexes_value } });
        if (Sexes_value == '') {
            res.status(201).json({ message: "Dữ liệu không thể rỗng" });
        }
        else if (existingSex) {
            return res.status(203).json({ message: 'đối tượng đã tồn tại trong hệ thống' });
        }
        else {
            await Sex.update({ Sexes_value }, { where: { id: req.params.id } });
            res.status(200).json({ message: "Cập nhật thành công" });
        }

    } catch (error) {
        return res.status(401).json({ message: "Không thể câp nhập đối tượng" });
    }
};

const deleteSex = async (req, res) => {
    const sex = await Sex.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!sex) return res.status(404).json({ message: "Không tìm thấy dữ liệu nào" });

    try {
        await Sex.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: "Xóa đối tượng thành công" });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    getAllSex,
    addSex,
    updateSex
    ,deleteSex
};

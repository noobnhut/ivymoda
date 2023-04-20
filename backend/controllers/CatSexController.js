const db = require('../models');
const CatSex = db.CatSexes;
const Cat = db.Categories;
const Sex = db.Sexes;


const getCatSex = async (req, res) => {

    try {
        const catsexes = await CatSex.findAll({
            attributes: ['id', 'id_cat', 'id_sex'],
            include: [
                { model: Cat, attributes: ['id','cat_name'] },
                { model: Sex, attributes: ['id','Sexes_value'] }
            ],
            raw: true,
            nest: true,           
        });
        const result = catsexes.map(catsex => ({
            id: catsex.id,
            id_cat:catsex.Category.id,
            id_sex:catsex.Sex.id,
            cat_name: catsex.Category.cat_name,
            Sexes_value: catsex.Sex.Sexes_value
        }));
        res.json(result);
    } catch (error) {
        res.json("không lấy được danh mục đối tượng ");
        console.log(error);
    }
}
// const getCatBySexId = async (req,res)=>
// {

// }
const addCatSex = async (req, res) => {
    try {
     const {id_cat,id_sex}=req.body;
     const existingCatSex = await CatSex.findOne({where:{id_cat,id_sex}});
     if(id_cat == '' || id_sex =='')
     {
        res.status(202).json({ message: "Thiếu thông tin nhập vào" });
            return;
     }
     else if(existingCatSex)
     {
        return res.status(203).json({ message: 'danh mục đối tượng tồn tại trong hệ thống' });

     }
     else {
        const sexcat = await CatSex.create({id_cat,id_sex });
        return res.status(201).json({ message: "Thêm danh mục đối tượng xong" });
    }
    } catch (error) {
        return res.status(401).json({ message: "Thêm thất bại !" })
    }
}
const updateCatSex = async (req, res) => {
    const catsex = await CatSex.findOne({ where: { id: req.params.id } });
    if (!catsex) return res.status(404).json({ message: "Không tìm thấy dữ liệu" });

    const { id_cat,id_sex } = req.body;
    const existingCatSex = await CatSex.findOne({where:{id_cat,id_sex}});

    try {
        if (id_cat == '' && id_sex =='') {
            res.status(201).json({ message: "Dữ liệu không thể rỗng" });
        }
        else if(existingCatSex && existingCatSex.id !== req.params.id )
     {
        return res.status(203).json({ message: 'danh mục đối tượng tồn tại trong hệ thống' });

     }
        else {
            await CatSex.update({ id_cat ,id_sex }, { where: { id: req.params.id } });
            res.status(200).json({ message: "Cập nhật thành công" });
        }

    } catch (error) {
        return res.status(401).json({ message: "Không thể câp nhập danh mục đối tượng" });
    }
};

const deleteCatSex = async (req, res) => {
    const catsex = await CatSex.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!catsex) return res.status(404).json({ message: "Không tìm thấy dữ liệu nào" });

    try {
        await CatSex.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: "Xóa danh mục đối tượng thành công" });
    } catch (error) {
        console.log(error.message);
    }
};
module.exports = {
    getCatSex,
    addCatSex,
    deleteCatSex,
    updateCatSex
};
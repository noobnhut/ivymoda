const db = require('../models');
const CatSex = db.CatSexes;
const Cat = db.Categories;
const Sex = db.Sexes;


const getCatSex = async (req, res) => 
{
    try {
        const catsexes = await CatSex.findAll({
            attributes: ['id', 'id_cat', 'id_sex'],
            include: [
                { model: Cat, attributes: ['cat_name'] },
                { model: Sex, attributes: ['Sexes_value'] }
            ],
            raw: true,
            nest: true
        });
        const result = catsexes.map(catsex => ({
            id: catsex.id,
            cat_name: catsex.Category.cat_name,
            Sexes_value: catsex.Sex.Sexes_value
        }));
        res.json(result);
    } catch (error) {
        res.json("không lấy được danh mục đối tượng ");
        console.log(error);
    }
}
module.exports = {
    getCatSex
};
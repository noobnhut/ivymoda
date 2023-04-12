const db = require('../models');
const CatSex = db.CatSexes;
const Product = db.Products;
const Cat = db.Categories;
const Sex = db.Sexes;
const Color = db.colors;
const Img = db.Imgs;
const Size=  db.size;

const renderProduct = async (req, res) => {
    try {
        const products = await Product.findAll({
            attributes: [
                'id', 'id_catsex', 'name', 'price',
                'information', 'discount'
            ],
            include: [
                {
                    model: CatSex,
                    include: [
                        { model: Cat, attributes: ['cat_name'] },
                        { model: Sex, attributes: ['Sexes_value'] },
                    ],
                    raw: true,
                    nest: true,
                    required: true // loại bỏ các sản phẩm không có màu
                },

            ],

        });

        const result = products.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            id_catsex: product.CatSex.id,
            id_sex: product.CatSex.id_sex,
            id_cat: product.CatSex.id_cat,
            cat_name: product.CatSex.Category.cat_name,
            sex_name: product.CatSex.Sex.Sexes_value,
        }));
        res.json(result);
    } catch (error) {
        res.status(404).json('Không lấy được sản phẩm');
        console.log(error);
    }
};
const renderColor = async (req, res) => {
    try {

        const img = await Img.findAll(
            {
                attributes: ['id', 'id_color', 'avatar','url'],
                include: [
                    {
                        model: Color, attributes: ['id', 'color','color_code','id_product'],
                    }
                ],
                raw: true,
                nest: true
            }
        );

        const size = await Size.findAll(
            {
              attributes: ['id', 'id_color', 'size', 'quantity'],
              include: [
                {
                  model: Color, attributes: ['id', 'color', 'color_code','id_product'],
                }
              ],
              raw: true,
              nest: true
            }
          );
                 
        const combinedData = img.map(item => {
            const itemSize = size.find(sizeItem => sizeItem.id_color === item.id_color);
            return {
                ...item,
                size: itemSize ? itemSize.size : null,
                quantity: itemSize ? itemSize.quantity : null
            };
        }).filter(item => item.size !== null && item.quantity !== null);

        res.status(200).json(combinedData);
    } catch (error) {
        res.status(404).json("không lấy được màu ");
    }
}

module.exports = {
    renderProduct,
    renderColor
};
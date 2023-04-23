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
                        { model: Cat, attributes: ['id','cat_name']},
                        { model: Sex, attributes: ['Sexes_value'] },
                    ],
                    raw: true,
                    nest: true,
                    required: true
                },
                {
                    model: Color,
                    attributes: ['id', 'color', 'color_code','detail_product'],
                    include: [
                        {
                            model: Img,
                            attributes: ['id', 'avatar', 'url'],required: true
                        },
                        {
                            model: Size,
                            attributes: ['id', 'size', 'quantity'],required: true
                        }
                    ]
                }
            ],

        });

        const result = [];

        products.forEach(product => {
            product.colors.forEach(color => {
                const productByColor = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    discount: product.discount,
                    information:product.information,
                    id_catsex: product.id_catsex,
                    id_cat: product.CatSex.Category.id,
                    cat_name: product.CatSex.Category.cat_name,
                    sex_name: product.CatSex.Sex.Sexes_value,
                    color_id: color.id,
                    color_name: color.color,
                    color_code: color.color_code,
                    detail_product:color.detail_product,
                    images: color.Imgs.map(img => ({
                        id: img.id,
                        avatar: img.avatar,
                        url: img.url,
                    })),
                    sizes: color.sizes.map(size => ({
                        id: size.id,
                        size_name: size.size,
                        quantity: size.quantity,
                    }))
                };

                result.push(productByColor);
            });
        });

        res.json(result);
    } catch (error) {
        res.status(404).json('Không lấy được sản phẩm');
        console.log(error);
    }
};


module.exports = {
    renderProduct,
};
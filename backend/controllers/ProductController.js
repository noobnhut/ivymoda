const db = require('../models');
const CatSex = db.CatSexes;
const Product = db.Products;
const Cat = db.Categories;
const Sex = db.Sexes;
const Color = db.colors;
const Img = db.Imgs;
const Size=  db.size;

const sequelize = require('sequelize');
const Op = sequelize.Op;
const unidecode = require('unidecode');
const getProduct = async (req, res) => {

    try {
        const product = await Product.findAll({
            attributes: ['id', 'id_catsex', 'name',
                'price', 'information', 'discount'
            ],
            include: [{
                model: CatSex,
                include: [{
                        model: Cat,
                        attributes: ['cat_name']
                    },
                    {
                        model: Sex,
                        attributes: ['Sexes_value']
                    }
                ]
            }],


        });
        const result = product.map(p => ({
            id: p.id,
            id_catsex: p.id_catsex,
            name: p.name,
            price: p.price,
            information: p.information,
            discount: p.discount,
            cat_name: p.CatSex.Category.cat_name,
            sexes_value: p.CatSex.Sex.Sexes_value
        }));
        res.json(result);
    } catch (error) {
        res.status(404).json("không lấy được sản phẩm ");
        console.log(error);
    }
}

const addProduct = async (req, res) => {
    try {
        const {
            id_catsex,
            name,
            price,
            information,
            discount
        } = req.body;
        const existingProduct = await Product.findOne({
            where: {
                name
            }
        })
        if (name == '' || price == '') {
            res.status(202).json({
                message: "Giá sản phẩm hoặc tên đang để trống"
            });
            return;
        } else if (existingProduct) {
            return res.status(203).json({
                message: 'Sản phẩm tồn tại trong hệ thống'
            });

        } else if (isNaN(price) || price <= 1000) {
            return res.status(206).json({
                message: "Giá sản phẩm không hợp lệ"
            });
        } else {
            const product = await Product.create({
                id_catsex,
                name,
                price,
                information,
                discount
            });
            return res.status(201).json({
                message: "Thêm sản phẩm xong"
            });

        }
    } catch (error) {
        return res.status(401).json({
            message: "Thêm thất bại !"
        })

    }
}

const updateProduct = async (req, res) => {
    //thực hiện kiểm tra id cần xóa
    const {
        id_catsex,
        name,
        price,
        information,
        discount
    } = req.body;
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    const existingProduct = await Product.findOne({
        where: {
            name
        }
    })
    if (!product) {
        return res.status(404).json({
            message: "không tìm thấy dữ liệu"
        });
    }
    try {
        if (name == '') {
            res.status(202).json({
                message: " Tên đang để trống"
            });
            return;
        } else if (existingProduct && existingProduct.id != req.params.id) {
            return res.status(203).json({
                message: 'Sản phẩm tồn tại trong hệ thống'
            });

        } else if (isNaN(price) || price <= 0 || price == '') {
            return res.status(206).json({
                message: "Giá sản phẩm không hợp lệ "
            });
        } else if (isNaN(discount) || discount <= 0 || discount == '') {
            return res.status(206).json({
                message: "Discount không hợp lệ "
            });
        } else {
            await Product.update({
                id_catsex,
                name,
                price,
                information,
                discount
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.status(201).json({
                message: "Cập nhập sản phẩm xong"
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: "Cập nhập thất bại !"
        })

    }
}

const deleteProduct = async (req, res) => {
    //thực hiện kiểm tra id cần xóa

    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) {
        return res.status(404).json({
            message: "không tìm thấy dữ liệu"
        });
    }

    try {


        await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            message: "Xóa sản phẩm thành công"
        });


    } catch (error) {
        console.log(error.message);
    }

}

const searchProduct = async (req, res) => {
    try {
      const query = req.query.q;
      if (!query) {
        return res.status(400).json({
          message: "Missing query parameter 'q'",
        });
      }
      const products = await Product.findAll({
        where: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("name")),
          "LIKE",
          `%${query.toLowerCase()}%`
        ),
        attributes: [
          "id",
          "id_catsex",
          "name",
          "price",
          "information",
          "discount",
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
                attributes: ['id', 'color', 'color_code'],
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
  
      products.forEach((product) => {
        product.colors.forEach((color) => {
          const productByColor = {
            id: product.id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            information: product.information,
            id_catsex: product.id_catsex,
            id_cat: product.CatSex.Category.id,
            cat_name: product.CatSex.Category.cat_name,
            sex_name: product.CatSex.Sex.Sexes_value,
            color_id: color.id,
            color_name: color.color,
            color_code: color.color_code,
            images: color.Imgs.map((img) => ({
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
      res.status(404).json("Không lấy được sản phẩm");
      console.log(error);
    }
  };



module.exports = {
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct,
    searchProduct
};
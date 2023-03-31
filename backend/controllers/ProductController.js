const db = require('../models');
const CatSex = db.CatSexes;
const Product = db.Products;
const Cat = db.Categories;
const Sex = db.Sexes;

const getProduct = async (req, res) => {

    try {
        const product = await Product.findAll(
            {
                attributes: ['id', 'id_catsex', 'name',
                    'price', 'detail', 'discount'],
                include: [
                    {
                        model: CatSex,
                        include: [
                            { model: Cat, attributes: ['cat_name'] },
                            { model: Sex, attributes: ['Sexes_value'] }
                        ]
                    }
                ],
                // where: { id },
               
            }
        );
        const result = product.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            detail: p.detail,
            discount: p.discount,
            cat_name: p.CatSex.Category.cat_name,
            sexes_value: p.CatSex.Sex.Sexes_value
        }));
        res.json(result);
    } catch (error) {
        res.json("không lấy được đối tượng ");
        console.log(error);
    }
}

const addProduct = async (req, res) => {
    try {
        const { id_catsex, name, price, detail, discount } = req.body;
        const existingProduct = await Product.findOne({ where: { name } })
        if (name == '' || price == '') {
            res.status(202).json({ message: "Giá sản phẩm hoặc tên đang để trống" });
            return;
        }
        else if (existingProduct) {
            return res.status(203).json({ message: 'Sản phẩm tồn tại trong hệ thống' });

        }
        else if (isNaN(price) || price <= 0) {
            return res.status(206).json({ message: "Giá sản phẩm không hợp lệ" });
        }
        else {
            const product = await Product.create({ id_catsex, name, price, detail, discount });
            return res.status(201).json({ message: "Thêm sản phẩm xong" });

        }
    } catch (error) {
        return res.status(401).json({ message: "Thêm thất bại !" })

    }
}

const updateProduct = async (req, res) => {
    //thực hiện kiểm tra id cần xóa
    const { id_catsex, name, price, detail, discount } = req.body;
    const product = await Product.findOne({ where: { id: req.params.id } });
    const existingProduct = await Product.findOne({ where: { name } })
    if (!product) {
        return res.status(404).json({ message: "không tìm thấy dữ liệu" });
    }
    try {
        if (name == '') {
            res.status(202).json({ message: " Tên đang để trống" });
            return;
        }
        else if (existingProduct && existingProduct.id != req.params.id ) {
            return res.status(203).json({ message: 'Sản phẩm tồn tại trong hệ thống' });

        }
        else if (isNaN(price) || price <= 0 || price == '') {
            return res.status(206).json({ message: "Giá sản phẩm không hợp lệ " });
        }
        else if (isNaN(discount) || discount <= 0 || discount == '') {
            return res.status(206).json({ message: "Discount không hợp lệ " });
        }
        else {
                await Product.update({ id_catsex, name, price, detail, discount }, { where: { id: req.params.id } });
                res.status(201).json({ message: "Cập nhập sản phẩm xong" });            
        }
    } catch (error) {
        return res.status(401).json({ message: "Cập nhập thất bại !" })

    }
}

const deleteProduct = async (req, res) => {
    //thực hiện kiểm tra id cần xóa
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) {
        return res.status(404).json({ message: "không tìm thấy dữ liệu" });
    }

    try {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct
};
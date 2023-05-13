const db = require('../models');
const Orders = db.Orders;
const OrderDetails = db.OrderDetails;
const Products = db.Products;
const Color = db.colors;
const Img = db.Imgs;
const createOrder = async (req, res) => {
  //console.log(req.body);
  let iduser = req.body.order;
  let orderDetails = req.body.orderDetails;
  console.log(req.body)

  try {
    // Tạo đơn hàng mới
    const order = await Orders.create({
      id_user: iduser.userId,
      total: iduser.total
    });
    // Tạo danh sách chi tiết đơn hàng mới
    const orderDetailsList = orderDetails.map(orderDetail => ({
      order_id: order.id,
      id_product: orderDetail.productId,
      quantity: orderDetail.quantity,
      price: orderDetail.price,
      id_color : orderDetail.colorId,
    }));

    // Lưu danh sách chi tiết đơn hàng mới vào cơ sở dữ liệu
    await OrderDetails.bulkCreate(orderDetailsList);

    res.status(200).json({
      message: "Đặt hàng thành công"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Đặt hàng thất bại"
    });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll({
      include: [{
        model: OrderDetails,
        as: 'order_details',
        attributes: ['id', 'status', 'id_product'],
        include: [{
          model: Products,
          attributes: ['name'],
          include: [{
            model: Color,
            attributes: ['id_product'],
            include: [{
              model: Img,
              attributes: ['url'],
            }]
          }]
        }],
      }],
    });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Lấy danh sách đơn hàng thất bạiiiii"
    });
  }
};

const getOrdersByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const orders = await Orders.findAll({
      where: {
        id_user: userId
      },
      include: [{
        model: OrderDetails,
        as: 'order_details',
        attributes: ['id', 'status', 'id_product','quantity','price'],
        include: [{
          model: Products,
          attributes: ['name'],
          include: [{
            model: Color,
            attributes: ['id_product'],
            include: [{
              model: Img,
              attributes: ['url'],
            }]
          }]
        }],
      }],
    });

    const fullOrders = orders.map(order => {
      const products = order.order_details.map(orderDetail => {
        const product = orderDetail.Product;
        const selectedColor = product.colors.find(color => color.id_product === orderDetail.id_product);
        const images = selectedColor && Array.isArray(selectedColor.Imgs) ? selectedColor.Imgs.map(image => image.url) : [];
        return {
          id: product.id,
          name: product.name,
          price: orderDetail.price,
          quantity: orderDetail.quantity,
          status: orderDetail.status,
          images: images
        };
      });

      const total = order.order_details.reduce((acc, orderDetail) => {
        return acc + orderDetail.price * orderDetail.quantity;
      }, 0);
      return {
        id: order.id,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        total: total,
        products: products,
        status: products.length > 0 ? products[0].status : null
      };
    });

    res.status(200).json(fullOrders);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Lấy danh sách đơn hàng thất bại"
    });
  }
};
 
const updateOrderDetailStatus = async (req, res) => {
  const orderDetailId = req.params.orderDetailId;
  const status = req.body.status;

  try {
    const orderDetail = await OrderDetails.findByPk(orderDetailId);

    if (!orderDetail) {
      res.status(404).json({
        message: "Không tìm thấy chi tiết đơn hàng"
      });
    } else {
      orderDetail.status = status;
      await orderDetail.save();

      res.status(200).json({
        message: "Cập nhật trạng thái đơn hàng thành công"
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Cập nhật trạng thái đơn hàng thất bại"
    });
  }
};
module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrderDetailStatus,
};
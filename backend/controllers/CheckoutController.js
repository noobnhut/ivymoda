const db = require('../models');
const Orders = db.Orders;
const OrderDetails = db.OrderDetails;

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
      price: orderDetail.price
    }));

    // Lưu danh sách chi tiết đơn hàng mới vào cơ sở dữ liệu
    await OrderDetails.bulkCreate(orderDetailsList);

    res.status(200).json({ message: "Đặt hàng thành công" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Đặt hàng thất bại" });
  }
};

module.exports = {
  createOrder
};
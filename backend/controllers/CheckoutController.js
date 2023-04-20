const db = require('../models');
const Orders = db.Orders;
const OrderDetails = db.OrderDetails;
const Products = db.Products;
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
    const orders = await Orders.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Lấy danh sách đơn hàng thất bại"
    });
  }
};
const getOrdersByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    // Lấy tất cả các đơn hàng của người dùng
    const orders = await Orders.findAll({
      where: {
        id_user: userId
      }
    });

    // Chuẩn bị danh sách đầy đủ các đơn hàng
    const fullOrders = await Promise.all(
      orders.map(async order => {
        // Lấy danh sách các chi tiết đơn hàng của đơn hàng hiện tại
        const orderDetails = await OrderDetails.findAll({
          where: {
            order_id: order.id
          }
        });

        // Chuẩn bị danh sách đầy đủ các sản phẩm của đơn hàng hiện tại
        const products = await Promise.all(
          orderDetails.map(async orderDetail => {
            const product = await Products.findByPk(orderDetail.id_product);

            return {
              id: product.id,
              name: product.name,
              price: orderDetail.price,
              quantity: orderDetail.quantity,
              status: orderDetail.status
            };
          })
        );

        // Tính tổng giá trị của đơn hàng hiện tại
        const total = orderDetails.reduce((acc, orderDetail) => {
          return acc + orderDetail.price * orderDetail.quantity;
        }, 0);

        return {
          id: order.id,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          total: total,
          products: products,
          status:products[0].status
        };
      })
    );

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
  updateOrderDetailStatus
};
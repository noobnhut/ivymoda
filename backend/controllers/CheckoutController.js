const db = require('../models');
const Orders = db.Orders;
const OrderDetails = db.OrderDetails;
const Products = db.Products;
const Sizes = db.size;
const Color = db.colors;
const Img = db.Imgs;
const createOrder = async (req, res) => {
  let iduser = req.body.order;
  let orderDetails = req.body.orderDetails;

  try {
    // Giảm quantity của size trong bảng sizes
    for (let i = 0; i < orderDetails.length; i++) {
      let orderDetail = orderDetails[i];
      let size = await Sizes.findOne({
        where: {
          id_color: orderDetail.colorId,
        }
      });
      if (size.quantity < orderDetail.quantity) {
        return res.status(400).json({
          message: `Sản phẩm ${orderDetail.productId} không đủ số lượng`
        });
      }
      await size.decrement('quantity', {
        by: orderDetail.quantity
      });
    }
    // Lưu thông tin đơn hàng vào cơ sở dữ liệu
    const order = await Orders.create({
      id_user: iduser.userId,
      total: iduser.total
    });
    const orderDetailsList = orderDetails.map(orderDetail => ({
      order_id: order.id,
      id_product: orderDetail.productId,
      quantity: orderDetail.quantity,
      price: orderDetail.price,
      id_color: orderDetail.colorId,
    }));
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
const cancelOrder = async (req, res) => {
  const orderDetailId = req.params.id;
<<<<<<< HEAD
  console.log(orderDetailId);
=======
>>>>>>> 8fd11f6630c6430ebcaf1c3b4b713bb1230de794
  try {
    // Lấy thông tin chi tiết đơn hàng
    const orderDetail = await OrderDetails.findOne({
      where: {
        id: orderDetailId
      },
      include: [Products, Color]
    });
    if (!orderDetail) {
      return res.status(404).json({
        message: "Không tìm thấy chi tiết đơn hàng"
      });
    }

    // Cập nhật trạng thái của đơn hàng thành 'Đã hủy đơn'
<<<<<<< HEAD
    await orderDetail.update({
      status: 'Đã hủy đơn'
    });
    // Tăng lại số lượng trong bảng sizes
    await Sizes.increment('quantity', {
      by: orderDetail.quantity,
      where: {
        id_color: orderDetail.Color.id
      }
    });
=======
    await OrderDetails.update(
      { status: 'Đã hủy đơn' },
      { where: { id: orderDetailId } }
    );

>>>>>>> 8fd11f6630c6430ebcaf1c3b4b713bb1230de794
    res.status(200).json({
      message: "Hủy đơn hàng thành công"
    });
  } catch (error) {
    res.status(500).json({
      message: "Hủy đơn hàng thất bại" + error.message
    });
  }
};


<<<<<<< HEAD








=======
>>>>>>> 8fd11f6630c6430ebcaf1c3b4b713bb1230de794
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
        attributes: ['id', 'status', 'id_product', 'quantity', 'price'],
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
  const orderId = req.params.orderDetailId;
  const status = req.body.status;

  try {
    await OrderDetails.update({
      status
    }, {
      where: {
        order_id: orderId
      }
    });

    res.status(200).json({
      message: "Cập nhật trạng thái đơn hàng thành công"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Cập nhật trạng thái đơn hàng thất bại"
    });
  }
};

module.exports = {
  createOrder,
  cancelOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrderDetailStatus,
};
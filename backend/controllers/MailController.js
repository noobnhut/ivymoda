const sgMail = require('@sendgrid/mail');
const db = require('../models');
const User = db.users;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

const sendMail = async (req, res) => {
    const {
        name,
        email,
        nameProduct,
        price,
        information,
        total
    } = req.body;
    console.log(total)
    // Kiểm tra xem có email hợp lệ không
    if (!email || !email.includes('@')) {
        res.status(400).json({
            message: 'Email không hợp lệ'
        });
        return;
    }

    // Kiểm tra xem có sản phẩm trong đơn hàng không
    if (!nameProduct || !Array.isArray(nameProduct) || nameProduct.length === 0) {
        res.status(400).json({
            message: 'Đơn hàng không hợp lệ'
        });
        return;
    }

    // Kiểm tra xem giá sản phẩm có hợp lệ không
    if (!price || !Array.isArray(price) || price.length !== nameProduct.length) {
        res.status(400).json({
            message: 'Giá sản phẩm không hợp lệ'
        });
        return;
    }

    sgMail.setApiKey(SENDGRID_API_KEY);//bỏ key ở trên cùng vào dấu ''

    let productsHTML = ''; // Chuỗi HTML để lưu thông tin sản phẩm
    if (nameProduct.length > 0) {
        for (let i = 0; i < nameProduct.length; i++) {
            productsHTML += `
            <tr>
              <td>${nameProduct[i]}</td>
              <td>${information[i]}</td>
              <td>${price[i]}Đ</td>
            </tr>
          `;
        }
    }

    const msg = {
        to: email,
        from: '	',
        subject: 'Thông báo mua hàng thành công',
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
            <h1 style="color: #1a1a1a; margin-bottom: 20px;">Chào ${name},</h1>
            <p style="font-size: 16px; color: #1a1a1a; margin-bottom: 10px; text-align: center;">🎉🎉🎉Chúc mừng bạn đã đặt hàng thành công 🎉🎉🎉</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333;">
              <thead>
                <tr style="background-color: #ddd; text-align: left;">
                  <th style="padding: 10px 20px;">Tên sản phẩm</th>
                  <th style="padding: 10px 20px;">Mô tả</th>
                  <th style="padding: 10px 20px;">Giá tiền</th>
                </tr>
              </thead>
              <tbody>
                ${productsHTML}
              </tbody>
            </table>
            <p style="font-size: 16px; color: #1a1a1a; margin-bottom: 10px;">Tổng tiền: ${total}Đ</p>
            <img src="https://pubcdn.ivymoda.com/files/news/2023/04/26/b2f0113a134232d03c3f1b0cd50bb844.jpg" alt="hình ảnh" style="max-width: 100%; height: auto; margin-bottom: 20px;">
          </div>
        `,
    };

    try {
        await sgMail.send(msg);
        res.status(200).json({
            message: 'Gửi email thành công'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Lỗi khi gửi email'
        });
    }
};

const getEmailByUserId = async (userId) => {
  try {
    const user = await User.findByPk(userId, { attributes: ['email', 'question'] });
    return user;
  } catch (error) {
    throw error;
  }
};

const sendQuestionCodeByEmail = async (userId) => {
  try {
    // Lấy thông tin về email và mã question của người dùng
    const user = await getEmailByUserId(userId);

    // Kiểm tra xem có email hợp lệ không
    if (!user.email || !user.email.includes('@')) {
      return {
        success: false,
        message: 'Email không hợp lệ'
      };
    }
    // Kiểm tra xem có mã question hợp lệ không
    if (!user.question) {
      return {
        success: false,
        message: 'Không tìm thấy mã question'
      };
    }

    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
      to: user.email,
      from: 'nguyen.nhut.99.2017@gmail.com',
      subject: 'Xác nhận đổi mật khẩu',
      text: `Mã question của bạn là: ${user.question}`,
    };

    // Gửi email
    await sgMail.send(msg);

    return {
      success: true,
      message: 'Gửi mã question thành công'
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Lỗi khi gửi mã question'
    };
  }
};

const sendCode = async (req, res) => {
  const { email } = req.body;
  // Kiểm tra xem email có hợp lệ hay không
  if (!email || !email.includes('@')) {
    res.status(400).json({
      message: 'Email không hợp lệ'
    });
    return;
  }

  try {
    // Kiểm tra xem email có trùng với email đã đăng ký và đã xác thực hay không
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({
        message: 'Email không tồn tại hoặc chưa xác thực'
      });
      return;
    }

    // Email hợp lệ, gửi mã question cho người dùng
    const result = await sendQuestionCodeByEmail(user.id);
    if (result.success) {
      res.status(200).json({
        message: 'Gửi mã xác thực thành công'
      });
      //console.log('ok'+ SENDGRID_API_KEY)
    } else {
      res.status(500).json({
        message: result.message
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Lỗi khi kiểm tra email'
    });
  }
};

module.exports = {
    sendMail,
    sendCode
};
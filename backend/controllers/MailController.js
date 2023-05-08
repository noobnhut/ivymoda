const sgMail = require('@sendgrid/mail');

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

    sgMail.setApiKey('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');

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
        from: 'nguyenthevann6@gmail.com',
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

module.exports = {
    sendMail
};
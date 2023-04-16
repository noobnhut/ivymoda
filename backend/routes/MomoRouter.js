const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/api/payment', (req, res) => {
  const endpoint = 'https://test-payment.momo.vn/gw_payment/transactionProcessor';
  const partnerCode = 'MOMO';
  const accessKey = 'F8BBA842ECF85';
  const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  const orderInfo = 'Thanh toán đơn hàng';
  const returnUrl = 'http://localhost:3000/api/result';
  const notifyUrl = 'http://localhost:3000/api/notify';
  const amount = 10000; // Số tiền cần thanh toán
  const requestId = 'abcdef123456'; // Mã đơn hàng
  const requestType = 'captureMoMoWallet';
  const extraData = '';

  const rawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${requestId}&amount=${amount}&orderInfo=${orderInfo}&returnUrl=${returnUrl}&notifyUrl=${notifyUrl}&extraData=${extraData}`;

  const crypto = require('crypto');
  const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

  const options = { 
    url: endpoint,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      partnerCode,
      accessKey,
      requestId,
      amount,
      orderInfo,
      returnUrl,
      notifyUrl,
      extraData,
      requestType,
      signature,
    }),
  };
  console.log(options);
  request.post(options, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi trong quá trình thanh toán' });
    } else {
      const responseJSON = JSON.parse(body);
      if (responseJSON.errorCode === 0) {
        res.redirect(responseJSON.payUrl);
      } else {
        res.status(500).json({  message: responseJSON.message });
      }
    }
  });
});
router.post('/api/notify', (req, res) => {
    const { errorCode, message, localMessage, requestId, orderId, orderInfo, amount, signature } = req.body;
    res.json('ok');
    // Kiểm tra chữ ký xác thực
    // Nếu chữ ký hợp lệ, tiến hành cập nhật trạng thái đơn hàng và gửi thông báo đến người dùng
  });
module.exports = router;
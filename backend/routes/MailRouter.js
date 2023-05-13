const express =require("express");
const {  
    sendMail,
    sendCode,
    sendMailAuth
} =require("../controllers/MailController.js") ;
const routerMail = express.Router();
routerMail.post('/api/send-email',sendMail);
routerMail.post('/api/send-code',sendCode);
routerMail.post('/api/resetPassword',sendMailAuth);
module.exports = { 
    routerMail,
};

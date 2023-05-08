const express =require("express");
const {  
    sendMail,
    sendCode
} =require("../controllers/MailController.js") ;
const routerMail = express.Router();
routerMail.post('/api/send-email',sendMail);
routerMail.post('/api/send-code',sendCode);
module.exports = { 
    routerMail,
};

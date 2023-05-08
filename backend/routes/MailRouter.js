const express =require("express");
const {  
    sendMail
} =require("../controllers/MailController") ;
const routerMail = express.Router();
routerMail.post('/api/send-email',sendMail);
module.exports = { 
    sendMail,
};

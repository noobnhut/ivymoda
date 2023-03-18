const { Sequelize } =require("sequelize");
const sequelize = new Sequelize("ivymoda","root",null,{
  host:"localhost",
  dialect:"mysql"
})

const ConnectDatabase = async()=>{
  try {
    await sequelize.authenticate();
    console.log("đã kết nối với database.");
  } catch (error) {
    console.error("kết nối thất bại", error);
  }
}
ConnectDatabase()
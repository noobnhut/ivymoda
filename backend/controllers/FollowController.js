const db = require('../models');
const Product = db.Products;
const Follow = db.Follows;

//sản phâm đã xem && đã thích
const productlike= async (req,res) =>
{
    const{id_user,id_product,status}=req.body;
    //kiem tra xem ton tai hay khong
    const existLike= await Follow.findOne({where:{id_user,id_product}});
    
    if(existLike)
    {
        const follow=await Follow.update({ status }, { where: { id_user: id_user ,id_product:id_product} });
        res.status(200).json({ follow,message: "san pham thich" })
    }
    else
    {
        const status_seen=false;
        const follow= await Follow.create( {id_user,id_product,status,status_seen} );
        res.status(200).json({ follow,message: "Thêm thành công san pham thich" })
    }
};

const productseen= async (req,res)=>
{
    const{id_user,id_product}=req.body;
    const existSeen= await Follow.findOne({where:{id_user,id_product}});
    if(existSeen )
    {
        const status_seen=true;      
        const follow=await Follow.update({ status_seen }, { where: { id_user: id_user } });
        res.status(200).json({ message: "Tồn tại" })
    }
    else
    {
        const status=false;
        const status_seen=true;
        const follow= await Follow.create( {id_user,id_product,status_seen,status} );
        res.status(200).json({message: "Thêm thành công san pham xem" })
    }
};

const renderlike = async (req,res)=>
{
    const id_user= req.params.id;
    try {
 const like = await Follow.findAll(
   {
    attributes:[ 'id_user','id','id_product', 'status','status_seen'],
    include:[
        {model:Product,as: 'Products',attributes: ['id','name','price','information']}
    ],
    raw: true,
    nest: true,
    where:{id_user:id_user}
   }
 );
 res.json(like);
}catch (error) {
    res.json("không lấy được ");
    console.log(error);
}
};

const renderseen = async (req,res)=>
{
    const id_user= req.params.id;
    try {
 const seen = await Follow.findAll(
   {
    attributes:[ 'id_user','id','id_product', 'status','status_seen'],
    include:[
        {model:Product,as: 'Products',attributes: ['id','name','price','information']}
    ],
    raw: true,
    nest: true,
    where:{id_user:id_user}
   }
 );
 res.json(seen);
}catch (error) {
    res.json("không lấy được ");
    console.log(error);
}
};

module.exports = {
    productlike,
    productseen,
    renderlike,
    renderseen
}
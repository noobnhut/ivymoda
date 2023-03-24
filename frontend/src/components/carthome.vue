<template>
    <div class="cart">
        <div class="cart_close">
            <h5 class="title">Giỏ hàng</h5>
            <button class="btn_close" @click="onclose"><i class="fa-solid fa-x"></i></button>
        </div>
        <div class="cart_list">
            <div class="cart_item d-flex">
                <div class="item_img">
                    <img src="https://pubcdn.ivymoda.com/files/product/thumab/400/2023/03/21/1ecdac8afe8ae7614c52818c2f92e6bc.jpg"
                        alt="">
                </div>
                
                <div class="item_info">
                    <p class="d-flex">Áo ren dáng ôm tay phồng</p>
                    <div class="item_info_detail d-flex">
                        <p class="detail">Màu trắng</p>
                        <p class="detail">Size:XXXXXX</p>
                    </div>
                    <div class="item_info_price  d-flex">
                        <input type="number" value="1" class="detail">
                        <p class="detail">Giá:1 tỷ</p>
                    </div>
                </div>
            </div>
            <div class="cart_item d-flex">
                <div class="item_img">
                    <img src="https://pubcdn.ivymoda.com/files/product/thumab/400/2023/03/21/1ecdac8afe8ae7614c52818c2f92e6bc.jpg"
                        alt="">
                </div>
                <div class="item_info">
                    <p class="d-flex">Áo ren dáng ôm tay phồng</p>
                    <div class="item_info_detail d-flex">
                        <p class="detail">Màu trắng</p>
                        <p class="detail">Size:XXXXXX</p>
                    </div>
                    <div class="item_info_price  d-flex">
                        <input type="number" value="1" class="detail">
                        <p class="detail">Giá:1 tỷ</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="see_cart">
            <a>Xem giỏ hàng</a>
        </div>
    </div>
</template>

<style>
.cart {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    width: 390px;
    max-width: 100%;
    z-index: 3;
    border: 1px solid #E7E8E9;
    border-radius: 4px;
}
.cart .see_cart
{
    padding: 0 24px;
    position: absolute;
    bottom: 60px;
    left: 0;
    width: 100%;
}
.cart .see_cart a
{
    color: #4B4E51;
    border: 1px solid #4B4E51;
    font-weight:bold;
    font-size: 16px;
    line-height: 20px;
    display: block;
    padding: 16px 0;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
}
.cart .btn_close {
    border: 0;
    outline: 0;
    font-size: 12px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    background: transparent;
}

.cart .cart_close .title {
    font-weight: bold;
}

.cart .cart_close {
    display: flex;
    justify-content: space-between;
    padding: 24px 24px 20px;
    border-bottom: .6px solid #dfdcdc;
    margin-bottom: 24px
}

.cart .cart_list {
    margin-top: 1.4rem;
}

.cart .cart_item {
    color: black;
    display: block;
    padding: 8px 10px;
    font-size: 1rem;
}

.cart_item .item_img {
    width: 64px;
}

.cart_item .item_img img {
    display: block;
    max-width: 100%;
    height: auto;
}

.cart_item .item_info {
    padding-left: 12px;
}

.cart_item .item_info p {
    font-size: 16px;
    margin: 0;

}

.cart_item .item_info .detail {
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    display: inline-block;
    margin-right: 16px;
    margin-bottom: 0;
}

.cart_item .item_info_price {
    padding-top: 10px;
    padding-right: 10px;
}
</style>

<script>

export default
{
    methods:
    {
        onclose()
        {
            this.$emit('cancel')
        }
    }
}
</script>
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
            <router-link to="/cart">Xem giỏ hàng</router-link>
        </div>
    </div>
</template>



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
<template>
    <div class="cart">
        <div class="cart_close">
            <h5 class="title">Giỏ hàng</h5>
            <button class="btn_close" @click="onclose"><i class="fa-solid fa-x"></i></button>
        </div>
        <div class="cart_item">
            <div class="cart_list" v-for="cart in cartItems">
                <div>
                    <div class="cart_item d-flex" v-for="product in products.filter(item => item.id === cart.productId && item.color_id==cart.colorId)">
                        <div class="item_img">
                            <swiper :modules="modules" class="mySwiper">
                                <swiper-slide v-for="img in product.images">
                                    <img :src="img.url" alt="">
                                </swiper-slide>
                            </swiper>
                        </div>

                        <div class="item_info">
                            <p class="d-flex">{{ product.name }}</p>
                            <div class="item_info_detail d-flex">
                                <p class="detail">Màu:{{ product.color_name }}</p>
                                <p class="detail" v-for="size in product.sizes.filter(item => item.id === cart.sizeid)">
                                    Size:{{
                                        size.size_name }}</p>
                            </div>
                            <div class="item_info_price">
                                <p class="detail">Giá:{{ formatCurrency(product.price) }}</p>
                                <input type="number" :value=cart.quantity>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


        <div class="see_cart">
            <span>Tổng tiền: <span class="fw-bold">{{formatCurrency(total)}}</span></span>

            <router-link to="/cart">Xem giỏ hàng</router-link>
        </div>
    </div>

    

</template>

<script>

import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

export default
    {

        data() {
            return {
                cartItems: null,
                products: [],
                total: 0
            }
        },
        components: {
          
            Swiper,
            SwiperSlide,
           
        },
        mounted() {
            let a = JSON.parse(sessionStorage.getItem('carts') || null);
            for (let b in a) {
                this.cartItems = a[b].items
                this.total = a[b].total
            }
            this.getproduct()

        },
      
        
        methods:
        {
            onclose() {
                this.$emit('cancel')
            },
            formatCurrency(value) {
                let val = (value / 1).toFixed(0).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ'
            },
            async getproduct() {
                try {
                    const result = await this.$axios.get(
                        `renderProduct`
                    );
                    this.products = result.data;
                    console.log(result);

                } catch (e) {
                    console.log(e);
                }
            },
        },
    }
</script>
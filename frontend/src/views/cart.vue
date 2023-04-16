<template>
    <navbar />
    <div class="container" style="padding-top:80px;">
        <div class="row" >
            <div class="col-12 col-lg-8 col-xl" >
                <div class="content_right" >
                    <div class="title_right d-flex" >
                        <h3 class="fw-bold" >Giỏ hàng của bạn <span style="font-size:20px;color:red">{{Squantity}} Sản Phẩm</span></h3>
                    </div>
                    <table class="table" >
                        <thead>
                            <tr>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Tổng tiền</th>

                            </tr>
                        </thead>
                        <tbody  v-for="cart in cartItems">
                            <tr v-for="product in products.filter(item => item.id === cart.productId && item.color_id==cart.colorId)" class="tr_order" >
                                <td  >
                                    <div class="cart_item">
                                        <div class="cart_item d-flex">
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
                                                    <p class="detail">{{ product.color_name }}</p>
                                                    <p class="detail" v-for="size in product.sizes.filter(item => item.id === cart.sizeid)"> Size: {{
                                                        size.size_name }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td><input type="number" :value=cart.quantity></td>
                                <td  class="fw-bold ">{{ formatCurrency(product.price) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-lg-4 ">
                <div class="content_left">
                    <h3 class="d-flex fw-bold">Tổng tiền giỏ hàng</h3>
                    <div class="d-flex sum_product justify-content-between">
                        <span>Tổng sản phẩm đã mua</span>
                        <span>{{Squantity}}</span>
                    </div>

                    <div class="d-flex sum_cart justify-content-between">
                        <span>Tổng tiền tạm tính</span>
                        <span>{{total}}</span>
                    </div>

                    <div class="d-flex final_cart justify-content-between">
                        <span>Thành tiền</span>
                        <span>{{total}}</span>
                    </div>

                    <hr>

                    <div class="d-flex btn_cart justify-content-between">
                      <router-link class="text-decoration-none" to="/order">
                        <button class="btn_user ">
                            Thanh toán
                        </button>
                      </router-link>  
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footerV />
</template>


<script>

import navbar from '../components/navbar.vue';
import footerV from '../components/footer.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
export default
    {
        components:
        {
            navbar,
            footerV,
            Swiper,
            SwiperSlide,
        },
        data() {
            return {
                cartItems: null,
                products: [],
                total: 0,
                Squantity:0,
            }
        },
        mounted() {
            let a = JSON.parse(sessionStorage.getItem('carts') || null);
            for (let b in a) {
                this.cartItems = a[b].items
                this.total = a[b].total
                this.Squantity=a[b].Squantity;
            }
            this.getproduct()

        },
        methods:
        {
           
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
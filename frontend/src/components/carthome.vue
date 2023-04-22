<template>
    <div class="cart">
        <div class="cart_close">

            <h5 class="title">Giỏ hàng <span style="font-size: 14px;color:#ccc">{{ Squantity }} sản phẩm</span></h5>


            <button class="btn_close" @click="onclose"><i class="fa-solid fa-x"></i></button>
        </div>
        <div class="cart_item">
            <div class="cart_list" v-for="(cart, index) in cartItems">
                <div>
                    <div class="cart_item d-flex"
                        v-for="product in products.filter(item => item.id === cart.productId && item.color_id == cart.colorId)">
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
                                <input type="number" min="1" @input="updateCart($event, cart, index)"
                                    :value="cart.quantity">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


        <div class="see_cart">
            <span>Tổng tiền: <span class="fw-bold">{{ formatCurrency(total) }}</span></span>
            <a class="text-decoration-none" @click="refresh" style="cursor:pointer;margin-bottom:10px">Cập nhập lại giỏ
                hàng</a>
            <router-link to="/cart">Xem giỏ hàng</router-link>
        </div>
    </div>
    <toast ref="toast"></toast>
</template>

<script>
import toast from './toastclient.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import Cookies from 'js-cookie';
// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

export default
    {

        data() {
            return {
                cartItems: null,
                products: [],
                total: 0,
                Squantity: 0
            }
        },
        components: {

            Swiper,
            SwiperSlide,
            toast

        },
        mounted() {
            let a = JSON.parse(sessionStorage.getItem('carts') || null);
            for (let b in a) {
                this.cartItems = a[b].items
                this.total = a[b].total
                this.Squantity = a[b].Squantity;
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
            getUser() {
                let user = JSON.parse(localStorage.getItem("user"));

                if (!user) {
                    const userId = "trans";
                    return userId;
                }
                else {
                    const userId = user.id;
                    return userId;
                }

            },
            getSizeQuantity(productId, sizeid, colorId) {
                const product = this.products.find(product => product.id === productId && product.color_id === colorId);
                if (product) {
                    const size = product.sizes.find(size => size.id === sizeid);
                    if (size) {
                        return size.quantity;
                    }
                }
                return null;
            },
            updateCartTotal(cart) {
                let total = 0;
                cart.items.forEach(item => {
                    total += item.quantity * item.price;
                });
                cart.total = total;

            },
            updateCartQuality(cart) {
                let Squantity = 0;
                cart.items.forEach(item => {
                    Squantity += item.quantity;
                });
                cart.Squantity = Squantity;

            },
            updateCart(event, cartS, index) {
                let carts = JSON.parse(sessionStorage.getItem('carts') || '[]');
                const userId = this.getUser();

                // Tìm kiếm giỏ hàng của người dùng hiện tại
                let cartIndex = carts.findIndex(cart => cart.userId === userId);
                let cart = cartIndex >= 0 ? carts[cartIndex] : null;

                if (cart !== null) {
                    // Lấy sản phẩm cần thay đổi số lượng
                    let item = cart.items[index];

                    // Kiểm tra số lượng mới có hợp lệ hay không
                    let newQuantity = parseInt(event.target.value);
                    if (newQuantity <= 0) {
                        newQuantity = 1;
                        event.target.value = newQuantity;
                    }
                    if (newQuantity > this.getSizeQuantity(item.productId, item.sizeid, item.colorId)) {
                        newQuantity = this.getSizeQuantity(item.productId, item.sizeid, item.colorId);
                        event.target.value = newQuantity;
                        this.$refs.toast.showToast('Số lượng sản phẩm đã đạt tối đa.');
                    }

                    // Cập nhật số lượng sản phẩm và tổng giá trị trong giỏ hàng
                    item.quantity = newQuantity;

                    this.updateCartTotal(cart);
                    this.updateCartQuality(cart);
                    // Cập nhật giỏ hàng trong sessionStorage
                    carts[cartIndex] = cart;
                    sessionStorage.setItem('carts', JSON.stringify(carts));
                }
            },
            refresh() {
                let a = JSON.parse(sessionStorage.getItem('carts') || null);
                for (let b in a) {
                    this.cartItems = a[b].items
                    this.total = a[b].total
                    this.Squantity = a[b].Squantity;
                    this.$refs.toast.showToast('Cập nhập giỏ hàng thành công')
                }
            }
        },
    }
</script>
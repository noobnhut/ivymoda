<template>
    <navbar />
    <div class="container" style="padding-top:80px;">
        <div class="row">
            <div class="col-12 col-lg-8 col-xl">
                <div class="content_right">
                    <div class="title_right d-flex">
                        <h3 class="fw-bold">Giỏ hàng của bạn <span style="font-size:20px;color:red">{{ Squantity }} Sản
                                Phẩm</span></h3>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Xóa</th>
                            </tr>
                        </thead>
                        <tbody v-for="(cart, index) in cartItems">
                            <tr v-for="product in products.filter(item => item.id === cart.productId && item.color_id == cart.colorId)"
                                class="tr_order">
                                <td>
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
                                                    <p class="detail"
                                                        v-for="size in product.sizes.filter(item => item.id === cart.sizeid)">
                                                        Size: {{
                                                            size.size_name }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td><input type="number" min="1" @input="updateCart($event, cart, index)"
                                        :value="cart.quantity">
                                </td>
                                <td class="fw-bold ">{{ formatCurrency(product.price) }}</td>
                                <td>
                                    <div>
                                        <div class="d-flex btn_cart justify-content-between">
                                            <button class="btn_user" @click="removeItem(index)">X</button>
                                        </div>
                                    </div>
                                </td>
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
                        <span>{{ Squantity }}</span>
                    </div>

                    <div class="d-flex sum_cart justify-content-between">
                        <span>Tổng tiền tạm tính</span>
                        <span>{{ formatCurrency(total) }}</span>
                    </div>

                    <div class="d-flex final_cart justify-content-between">
                        <span>Thành tiền</span>
                        <span>{{ formatCurrency(total) }}</span>
                    </div>

                    <hr>


                    <div>
                        <div class="d-flex btn_cart justify-content-between">
                            <div class=" d-flex justify-content-between">
                                <button @click="gotoOrder" class="btn_user text-decoration-none">
                                    Đặt hàng
                                </button>
                                <button class="btn_user" @click="refresh()" style="margin-left:10px ;">
                                    Cập nhập đơn hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <toast ref="toast"></toast>

    <footerV />
</template>


<script>
import toast from '../components/toastclient.vue';

import navbar from '../components/navbar.vue';
import footerV from '../components/footer.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import Cookies from 'js-cookie';

import 'swiper/css/pagination';
export default
    {
        components:
        {
            navbar,
            footerV,
            Swiper,
            SwiperSlide,
            toast
        },
        data() {
            return {
                cartItems: null,
                products: [],
                total: 0,
                Squantity: 0,
                paymentMethod: 'cash',
            }
        },
        mounted() {
            let a = JSON.parse(sessionStorage.getItem('carts') || null);
            if (a && a.length > 0) { // kiểm tra giỏ hàng có rỗng hay không
                for (let i = 0; i < a.length; i++) {
                    this.cartItems = a[i].items;
                    this.total = a[i].total;
                    this.Squantity = a[i].Squantity;
                }
            }
            this.getproduct();
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
            getIdUser() {
                const carts = JSON.parse(sessionStorage.getItem('carts') || '[]');
                let userId = null;

                // Lấy userId từ chuỗi JSON trong mảng
                const userIdJson = carts[0]?.userId || null;
                try {
                    userId = userIdJson ? JSON.parse(userIdJson).user?.id : null;
                } catch (error) {
                    console.error('Error parsing user ID from JSON:', error);
                }

                // Nếu không tìm thấy userId, lấy userId từ thuộc tính id của đối tượng user
                if (!userId) {
                    let Google = JSON.parse(sessionStorage.getItem('carts') || '[]');
                    let userIdJson = Google[0]?.userId || null;
                    let userId = userIdJson ? JSON.parse(userIdJson).id : null;
                    return userId;
                }

                return userId;
            },

            removeItem(index) {
                let removedItem = this.cartItems.splice(index, 1)[0]; // Lấy sản phẩm cần xóa và xóa khỏi mảng giỏ hàng
                let a = JSON.parse(sessionStorage.getItem('carts') || '[]');
                a[0].items.splice(index, 1); // Xóa sản phẩm khỏi mảng giỏ hàng
                a[0].total = a[0].items.reduce((total, item) => total + item.price * item.quantity, 0); // Tính lại tổng giá trị của các sản phẩm trong giỏ hàng
                a[0].Squantity = a[0].items.reduce((total, item) => total + item.quantity, 0); // Tính lại tổng số lượng của các sản phẩm trong giỏ hàng
                sessionStorage.setItem('carts', JSON.stringify(a)); // Lưu lại mảng giỏ hàng mới vào sessionStorage
                this.cartItems = a[0].items; // Cập nhật lại mảng giỏ hàng trên giao diện
                this.total = a[0].total; // Cập nhật lại tổng giá trị trên giao diện
                this.Squantity = a[0].Squantity; // Cập nhật lại tổng số lượng trên giao diện
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
                        this.$refs.toast.showToast('Số lượng đặt của sản phẩm đã tối đa.')


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
                }
                this.$refs.toast.showToast('Cập nhập thành công.')
            },
            gotoOrder() {
                let carts = JSON.parse(sessionStorage.getItem('carts') || '[]');
                const userId = this.getUser();
                let user = JSON.parse(localStorage.getItem("user"));
                // Tìm kiếm giỏ hàng của người dùng hiện tại
                let cartIndex = carts.findIndex(cart => cart.userId === userId);
                let cart = cartIndex >= 0 ? carts[cartIndex] : null;

                if (cart !== null) {
                    if (cart.items.length > 0) {
                        if (user) {
                            this.$router.push({ name: 'order' });
                        }
                        else {
                            this.$refs.toast.showToast('Bạn chưa đăng nhập vui lòng đăng nhập để mua hàng.')
                            setTimeout(() => {
                                this.$router.push({ name: "login" });
                            }, 1000);

                        }
                    }
                    else if (cart.items.length == 0) {
                        this.$refs.toast.showToast('Giỏ hàng trống.')
                    }
                }
                else {
                    this.$refs.toast.showToast('Giỏ hàng trống.')
                    console.log(cart)

                }


            }
        },
    }
</script>
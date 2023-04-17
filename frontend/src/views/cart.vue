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
                        <span>{{ total }}</span>
                    </div>

                    <div class="d-flex final_cart justify-content-between">
                        <span>Thành tiền</span>
                        <span>{{ total }}</span>
                    </div>

                    <hr>


                    <div>
                        <div class="d-flex btn_cart justify-content-between">
                            <a class="text-decoration-none">
                                <button class="btn_user" @click="checkout()">
                                    Thanh toán
                                </button>
                            </a>
                        </div>
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
            async checkout() {
                let a = JSON.parse(sessionStorage.getItem('carts') || '[]');
                // check giỏ hàng rỗng
                if (a.length === 0 || !a[0]?.items || a[0].items.length === 0) {
                    console.error('có cc gì đâu mà thanh toán ?');
                    return;
                }
                // Tạo đối tượng đơn hàng và chi tiết đơn hàng
                let order = {
                    userId: this.getIdUser(),
                    total: this.total,
                };
                console.log('id của user = ' + order.userId);

                let orderDetails = a[0]?.items.map(item => {
                    return {
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                        userId: this.getIdUser()
                    };
                }) || [];
                let data = {
                    order: order,
                    orderDetails: orderDetails
                };
                const checkout = await this.$axios.post(`orders`, data)
                    .then(response => {
                        console.log(response.data);
                        // Xóa giỏ hàng sau khi lưu đơn hàng thành công
                        sessionStorage.removeItem('carts');
                        location.reload();
                    })
                    .catch(error => {
                        console.log(error);
                    });
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
            updateCart(event, cartS, index) {
                let cart = JSON.parse(sessionStorage.getItem('carts') || []);
                let user = localStorage.getItem("user");
                const a = JSON.parse(user);
                if (cart !== null) {
                    if (event.target.value > this.getSizeQuantity(cartS.productId, cartS.sizeid, cartS.colorId)) {
                        event.target.value = this.getSizeQuantity(cartS.productId, cartS.sizeid, cartS.colorId)
                        cart[0]['items'][index].quantity = this.getSizeQuantity(cartS.productId, cartS.sizeid, cartS.colorId)
                        cart[0].total = cart[0].items.reduce((total, item) => total + item.price * item.quantity, 0); // Tính lại tổng giá trị của các sản phẩm trong giỏ hàng
                        cart[0].Squantity = cart[0].items.reduce((total, item) => total + item.quantity, 0); // Tính lại tổng số lượng của các sản phẩm trong giỏ hàng
                        sessionStorage.setItem('carts', JSON.stringify(cart));
                    }
                    else {
                        cart[0]['items'][index].quantity = event.target.value;
                        cart[0].total = cart[0].items.reduce((total, item) => total + item.price * item.quantity, 0); // Tính lại tổng giá trị của các sản phẩm trong giỏ hàng
                        cart[0].Squantity = cart[0].items.reduce((total, item) => total + item.quantity, 0); // Tính lại tổng số lượng của các sản phẩm trong giỏ hàng
                        sessionStorage.setItem('carts', JSON.stringify(cart));
                    }
                }

            }
        },
    }
</script>
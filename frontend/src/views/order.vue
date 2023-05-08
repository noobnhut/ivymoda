<template>
    <navbar />
    <div class="container" style="padding-top:80px;">
        <div class="row">
            <div class="col-12 col-lg-8 col-xl">

                <h3 class="d-flex fw-bold">Thông tin cá nhân của bạn</h3>
                <div class="row form-group" style="padding-top: 10px;">
                    <div class="col col-label">
                        <label>Họ và tên:</label>
                    </div>
                    <div class="col col-input">
                        <input class="form-control" v-model="username" type="text" disabled>
                    </div>
                </div>
                <div class="row form-group" style="padding-top: 10px;">
                    <div class="col col-label">
                        <label>Email:</label>
                    </div>
                    <div class="col col-input">
                        <input class="form-control" v-model=email type="text" disabled="disabled">
                    </div>
                </div>
                <div class="row form-group" style="padding-top: 10px;">
                    <div class="col col-label">
                        <label>Địa chỉ:</label>
                    </div>
                    <div class="col col-input">
                        <input class="form-control" v-model="address" placeholder="Cập nhật địa chỉ" type="text"
                            @focus="hidePlaceholder" disabled>
                    </div>
                </div>
                <div class="row form-group" style="padding-top: 10px;">
                    <div class="col col-label">
                        <label>Số điện thoại:</label>
                    </div>
                    <div class="col col-input">
                        <input class="form-control" v-model="phone" placeholder="Cập nhật số điện thoại" type="number"
                            @focus="hidePlaceholder" disabled>
                    </div>
                </div>
                <div class="d-flex btn_cart justify-content-between">
                    <router-link to="/customer/information" class="text-decoration-none d-flex justify-content-between">
                        <button class="btn_user">
                            Quay lại cập nhập thông tin
                        </button>

                    </router-link>
                </div>
                <hr>



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
                            <a class="text-decoration-none d-flex justify-content-between">
                                <button class="btn_user" @click="checkout()">
                                    Thanh toán
                                </button>

                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="title_right d-flex">
            <h3 class="fw-bold">Danh sách sản phẩm đã mua</h3>
        </div>
        <div class="content_right order_content">

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tổng tiền</th>

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
                        <td><input type="number" min="1" disabled :value="cart.quantity">
                        </td>
                        <td class="fw-bold ">{{ formatCurrency(product.price) }}</td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <toast ref="toast"></toast>

    <footerV />
</template>

<style>
.order_content {
    overflow: auto;
    height: 250px;
}
</style>
<script>

import navbar from '../components/navbar.vue';
import footerV from '../components/footer.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import Cookies from 'js-cookie';
import toast from '../components/toastclient.vue';

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
                user: [],
                total: 0,
                Squantity: 0,
                paymentMethod: 'cash',
                username: '',
                email: '',
                phone: '',
                address: ''
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
            this.getUserById();
            this.getData();
            this.getItemsCartName();
            this.getIn4Items();
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
                } catch (e) {
                    console.log(e);
                }
            },
            getIdUser() {
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
            async checkout() {
                // Kiểm tra xem thông tin khách hàng có đầy đủ không
                if (!this.address || !this.email || !this.phone || !this.username) {
                    this.$refs.toast.showToast('Thông tin bị trống vui lòng cập nhập !');
                } else {
                    // Lấy các sản phẩm trong giỏ hàng từ session storage
                    let a = JSON.parse(sessionStorage.getItem('carts') || '[]');

                    // Kiểm tra xem giỏ hàng có trống không
                    if (a.length === 0 || !a[0]?.items || a[0].items.length === 0) {
                        console.error('không có sản phẩm, không thể thanh toán!!!');
                        return;
                    }

                    // Tạo đối tượng đơn hàng và chi tiết đơn hàng
                    let order = {
                        userId: this.getIdUser(),
                        total: this.total,
                    };
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

                    // Gửi yêu cầu HTTP POST đến endpoint orders với dữ liệu đơn hàng
                    const checkout = await this.$axios.post(`orders`, data)
                        .then(async response => {
                            // Xóa các sản phẩm trong giỏ hàng khỏi session storage
                            this.$refs.toast.showToast('Mua hàng thành công !');
                            if (response.data.message === 'Đặt hàng thành công') {
                                // Gửi email lên server
                                await this.sendEmail();
                                sessionStorage.removeItem('carts');
                                setTimeout(() => {
                                    // Chuyển hướng đến trang control_order
                                    this.$router.push({ name: "control_order" });
                                }, 1000);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },

            async sendEmail() {
                const data = this.getData();
                const nameproduct = this.getItemsCartName();
                const price = this.getItemsPrice();
                const in4 = this.getIn4Items();
                // Tạo dữ liệu email
                let emailData = {
                    email: data.email,
                    name: data.username,
                    nameProduct: nameproduct, // truyền mảng names vào đây
                    price : price,
                    information : in4,
                    total : this.total,
                };

                // Gửi yêu cầu HTTP POST đến endpoint send-email để gửi email
                await this.$axios.post(`send-email`, emailData)
                    .then(response => {
                        console.log('Gửi email thành công:', response.data);
                    })
                    .catch(error => {
                        console.log('Lỗi khi gửi email:', error);
                    });
            },
            getData() {
                const userJSON = localStorage.getItem('user'); // Lấy chuỗi JSON từ localStorage
                let dulieu;
                const data = JSON.parse(userJSON); // Chuyển chuỗi JSON thành đối tượng JavaScript
                if (data) {
                    dulieu = data; // Lấy giá trị của thuộc tính "email" trong đối tượng "user"
                }
                return dulieu;
            },
            getItemsCartName() {
                let carts = JSON.parse(sessionStorage.getItem('carts') || '[]');
                let names = [];
                carts.forEach(cart => {
                    cart.items.forEach(item => {
                        names.push(item.name);
                    });
                });
                console.log(names);
                return names; // trả về mảng names
            },
            getItemsPrice() {
                let carts = JSON.parse(sessionStorage.getItem('carts') || '[]');
                let names = [];
                carts.forEach(cart => {
                    cart.items.forEach(item => {
                        names.push(item.price);
                    });
                });
                console.log(names);
                return names; // trả về mảng names
            },
            getIn4Items(){
                let carts = JSON.parse(sessionStorage.getItem('carts') || '[]');
                let names = [];
                carts.forEach(cart => {
                    cart.items.forEach(item => {
                        names.push(item.in4);
                    });
                });
                console.log(names);
                return names; // trả về mảng names
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
            getID() {
                const userJSON = localStorage.getItem('user'); // Lấy chuỗi JSON từ localStorage
                let userId;
                const data = JSON.parse(userJSON); // Chuyển chuỗi JSON thành đối tượng JavaScript
                if (data.id) {
                    userId = data.id; // Lấy giá trị của thuộc tính "id" trong đối tượng "user"
                } else {
                    userId = data.user.id; // Lấy giá trị của thuộc tính "id" trong đối tượng "user" trong chuỗi JSON
                }
                return userId;
            },

            async getUserById() {
                const userId = this.getID();
                try {
                    const response = await this.$axios.get(`getUserById/${userId}`);
                    this.user = response.data;
                    this.address = response.data.address;
                    this.email = response.data.email;
                    this.phone = response.data.phone;
                    this.username = response.data.username;
                } catch (error) {
                    console.log(error);
                }
            },

        },
    }
</script>
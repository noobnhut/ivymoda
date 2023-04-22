<template>
    <div class="container" style="padding-top: 100px;">
        <div class="row">
            <div class="col-lg-4 col-xl-auto">
                <user_nav />
            </div>
            <div class="col-lg-8 col-xl">

                <div class="product_like">
                    <h3 class="d-flex fw-bold">Sản phẩm yêu thích</h3>
                    <swiper :spaceBetween="10" :modules="modules"
                        :breakpoints="{ 600: { slidesPerView: 1 }, 800: { slidesPerView: 2 }, 1000: { slidesPerView: 3 } }"
                        class="mySwiper">

                        <swiper-slide v-for="product in filteredProducts()">
                            <div class="product-card">
                                <div class="product-tumb">
                                    <swiper :modules="modules" class="mySwiper">
                                        <swiper-slide v-for="img in product.images">
                                            <img :src="img.url" alt="">
                                        </swiper-slide>
                                    </swiper>
                                </div>
                                <div class="product-details">
                                    <div class="d-flex justify-content-between">
                                        <span class="product-catagory">{{ product.cat_name }} - {{ product.sex_name
                                        }}</span>
                                        <span class="product-color" :style="{ backgroundColor: product.color_code }"></span>
                                    </div>
                                    <h4 style="height:50px">
                                        <router-link @click="addseen(product.id)"
                                            :to="{ name: 'detail', params: { id: product.id, id_color: product.color_id, id_cat: product.id_cat } }">{{
                                                product.name
                                            }} - {{ product.color_name }}</router-link>
                                    </h4>

                                    <div class="product-bottom-details">
                                        <div class="product-price" style="height:50px">
                                            <small>{{ formatCurrency(product.price) }}</small>{{
                                                formatCurrency(product.price -
                                                    (product.price *
                                                        (product.discount) / 100)) }}
                                        </div>
                                        <div class="product-links">
                                            <a class="action">
                                                <!-- Sử dụng v-if để kiểm tra xem sản phẩm có trong danh sách thích hay không -->
                                                <span v-if="likes.some(item => item.id_product === product.id)">
                                                    <!-- Sử dụng v-for để lặp lại các sản phẩm trong danh sách thích -->
                                                    <span
                                                        v-for="like in likes.filter(item => item.id_product === product.id)">
                                                        <!-- Kiểm tra trạng thái của sản phẩm và sử dụng màu đỏ hoặc #ccc tương ứng -->
                                                        <i class="fa fa-heart"
                                                            :style="{ color: like.status ? 'red' : '#ccc' }"
                                                            @click="updatelike(like, product.id)"></i>
                                                    </span>
                                                </span>
                                                <!-- Nếu không có sản phẩm nào trong danh sách thích, hiển thị chữ màu #ccc -->
                                                <span v-else>
                                                    <i class="fa fa-heart" style="color: #ccc"
                                                        @click="addlike(product.id)"></i>
                                                </span>
                                            </a>
                                            <a class="dropup-center dropup action"><i class="fa fa-shopping-cart"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <ul class="dropdown-menu">
                                                        <li v-for="size in product.sizes">
                                                            <p class="dropdown-item text-dark d-flex justify-content-center"
                                                                @click="addToCart(product, size.id)">
                                                                {{ size.size_name }}</p>
                                                        </li>
                                                    </ul>
                                                </i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>



                    </swiper>
                </div>
            </div>
        </div>
    </div>
    <toast ref="toast"></toast>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import Cookies from 'js-cookie';
import toast from '../../components/toastclient.vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper';
import user_nav from '../../components/customer/user_nav.vue';
export default
    {

        components:
        {
            user_nav,
            Swiper,
            SwiperSlide,
            toast
        },
        data() {
            return {
                sees: [],
                products: [],
                likes: []
            }
        },
        setup() {
            return {
                modules: [Pagination],
            };
        },
        mounted() {
            this.getsee();
            this.getproduct();
            this.filteredProducts()
            this.getlike()
        },
        methods: {
            async getsee() {
                let user = localStorage.getItem("user");
                const a = JSON.parse(user);

                try {
                    const result = await this.$axios.get(
                        `getseen/` + a.id
                    );
                    this.sees = result.data;
                    console.log(result);

                } catch (e) {
                    console.log(e);
                }

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
            formatCurrency(value) {
                let val = (value / 1).toFixed(0).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ'
            },
            filteredProducts() {
                return this.products.filter((product) => {
                    return this.sees.some((see) => see.id_product === product.id && see.status === 1);
                });
            },

            async getlike() {
                let user = localStorage.getItem("user");
                const a = JSON.parse(user);

                try {
                    const result = await this.$axios.get(
                        `getlike/` + a.id
                    );
                    this.likes = result.data;
                    console.log(result);

                } catch (e) {
                    console.log(e);
                }

            },
            async addlike(id) {
                let user = localStorage.getItem("user");
                const a = JSON.parse(user);
                if (user) {
                    try {
                        const response = await this.$axios.post('addlike',
                            {
                                id_product: id,
                                id_user: a.id,
                                status: true
                            });
                        location.reload()
                    } catch (error) {
                        console.error(error);
                    }
                }
            },
            async updatelike(like, id_product) {
                let user = localStorage.getItem("user");
                const a = JSON.parse(user);

                const statusreal = like.status ? false : true;;
                if (user) {
                    try {
                        const response = await this.$axios.post('addlike',
                            {
                                id_product: id_product,
                                id_user: a.id,
                                status: statusreal
                            });
                        like.status = !like.status
                    } catch (error) {
                        console.error(error);
                    }
                }

            },
            async addseen(id) {
                let user = localStorage.getItem("user");
                const a = JSON.parse(user);
                if (user) {
                    try {
                        const response = await this.$axios.post('addseen',
                            {
                                id_product: id,
                                id_user: a.id

                            });
                    } catch (error) {
                        console.error(error);
                    }
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
            addToCart(product, sizeid) {
                const userId = this.getUser();

                // Lấy thông tin giỏ hàng từ sessionStorage
                let carts = JSON.parse(sessionStorage.getItem('carts') || '[]');

                // Kiểm tra xem giỏ hàng của người dùng đã tồn tại trong sessionStorage hay chưa
                let cartIndex = carts.findIndex(cart => cart.userId === userId);
                let cart = cartIndex >= 0 ? carts[cartIndex] : null;
                if (!cart) {
                    // Nếu giỏ hàng của người dùng chưa tồn tại trong sessionStorage, tạo một giỏ hàng mới
                    cart = {
                        userId: userId,
                        items: [],
                        total: 0,
                        Squantity: 0
                    };
                    carts.push(cart);
                }

                // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
                let itemIndex = cart.items.findIndex(item => item.productId === product.id && item.sizeid === sizeid);
                let item = itemIndex >= 0 ? cart.items[itemIndex] : null;
                if (!item) {
                    // Nếu sản phẩm chưa có trong giỏ hàng, tạo một sản phẩm mới
                    item = {
                        productId: product.id,
                        colorId: product.color_id,
                        sizeid: sizeid,
                        price: product.price,
                        quantity: 1
                    };
                    cart.items.push(item);
                    this.$refs.toast.showToast('Thêm thành công sản phẩm vào giỏ hàng.')
                } else {
                    // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng sản phẩm lên 1
                    if (this.getSizeQuantity(item.productId, item.sizeid, item.colorId) > item.quantity) {
                        item.quantity += 1;
                        this.$refs.toast.showToast('Thêm thành công.')

                    }
                    else {
                        this.$refs.toast.showToast('Số lượng đặt của sản phẩm đã tối đa.')
                    }
                }
                this.updateCartTotal(cart);
                this.updateCartQuality(cart);
                carts[cartIndex] = cart;
                sessionStorage.setItem('carts', JSON.stringify(carts));


            },
        }
    }
</script>
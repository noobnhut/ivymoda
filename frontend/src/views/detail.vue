<template>
    <navbar />

    <div class="container" style="padding-top: 100px;">
        <checksize v-if="isShowSize" @cancelcheck="showSize()" />

        <div class="detail"
            v-for="product in products.filter(item => item.id == this.$route.params.id && item.color_id == this.$route.params.id_color)">
            <div class="row">

                <div class="col-md-6">
                    <div class="detail_img">
                        <swiper :modules="modules" class="mySwiper">
                            <swiper-slide v-for="img in product.images">
                                <img :src="img.url" alt="">
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="detail_information">
                        <h3>{{ product.name }}</h3>

                        <div class="detail_price">
                            <b>
                                <small style="text-decoration: line-through;margin-right: 5px;">{{
                                    formatCurrency(product.price) }}</small>{{ formatCurrency(product.price - (product.price
        * (product.discount) / 100)) }}

                            </b>
                        </div>

                        <div class="detail_color">
                            <b>Màu sắc: {{ product.color_name }}</b>
                        </div>

                        <div class="detail_size">
                            <label for="cat_id">Danh mục:</label>
                            <select id="cat_id" v-model="size_id" required>
                                <option disabled>Chọn loại danh mục</option>
                                <option v-for="size in product.sizes" :key="size.id" :value="size.id">{{ size.size_name }}
                                </option>
                            </select>



                            <div class="detail_checksize">
                                <a @click="showSize">Kiểm tra size của bạn</a>

                            </div>

                            <div class="detail_qty d-flex ">
                                <b>SỐ LƯỢNG:</b>
                                <input type="number" v-model="number">
                            </div>

                            <div class="detail_cart d-flex">
                                <button class="btn" @click="addToCart2(product)">
                                    Thêm vào giỏ
                                </button>
                            </div>
                        </div>
                        <div class="detail_infor">
                            <h3>Chi tiết sản phẩm</h3>
                            <p>{{ product.information }}</p>
                            <h5>Thông tin màu sắc</h5>
                            <p>{{ product.detail_product }}</p>

                            <p class="note">Lưu ý: Màu sắc sản phẩm thực tế sẽ có sự chênh lệch nhỏ so với ảnh do điều
                                kiện ánh sáng khi chụp và màu sắc hiển thị qua màn hình máy tính/ điện thoại.</p>


                        </div>

                    </div>
                </div>


            </div>

            <div class="product_view">
                <div class="title_product">
                    Sản phẩm liên quan
                </div>
                <swiper :spaceBetween="10" :modules="modules"
                    :breakpoints="{ 600: { slidesPerView: 1 }, 800: { slidesPerView: 2 }, 1000: { slidesPerView: 3 }, 1200: { slidesPerView: 4 }, 1400: { slidesPerView: 5 }, }"
                    class="mySwiper">

                    <swiper-slide
                        v-for="product in products.filter(item => item.id_cat == this.$route.params.id_cat && item.id != this.$route.params.id)  ">
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
                                    <span class="product-catagory">{{ product.cat_name }} - {{ product.sex_name }}</span>
                                    <span class="product-color" :style="{ backgroundColor: product.color_code }"></span>
                                </div>
                                <h4 style="height:30px">
                                    <router-link
                                        :to="{ name: 'detail', params: { id: product.id, id_color: product.color_id } }">{{
                                            product.name
                                        }} - {{ product.color_name }}</router-link>
                                </h4>
                                <div class="product-bottom-details">
                                    <div class="product-price" style="height:50px">
                                        <small>{{ formatCurrency(product.price) }}</small>{{ formatCurrency(product.price -
                                            (product.price * (product.discount) / 100)) }}
                                    </div>
                                    <div class="product-links">
                                        <a class="action">
                                            <!-- Sử dụng v-if để kiểm tra xem sản phẩm có trong danh sách thích hay không -->
                                            <span v-if="likes.some(item => item.id_product === product.id)">
                                                <!-- Sử dụng v-for để lặp lại các sản phẩm trong danh sách thích -->
                                                <span v-for="like in likes.filter(item => item.id_product === product.id)">
                                                    <!-- Kiểm tra trạng thái của sản phẩm và sử dụng màu đỏ hoặc #ccc tương ứng -->
                                                    <i class="fa fa-heart" :style="{ color: like.status ? 'red' : '#ccc' }"
                                                        @click="updatelike(like, product.id)"></i>
                                                </span>
                                            </span>
                                            <!-- Nếu không có sản phẩm nào trong danh sách thích, hiển thị chữ màu #ccc -->
                                            <span v-else>
                                                <i class="fa fa-heart" style="color: #ccc" @click="addlike(product.id)"></i>
                                            </span>
                                        </a>

                                        <a class="dropup-center dropup action"><i class="fa fa-shopping-cart" type="button"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                <ul class="dropdown-menu">
                                                    <li v-for="size in product.sizes">
                                                        <p class="dropdown-item text-dark d-flex justify-content-center"
                                                            @click="addToCart(product, size.id)">{{ size.size_name }} </p>
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
    <toast ref="toast"></toast>

    <footerV />
</template>

<style>
.selected {
    color: red;
}
</style>
<script>

import navbar from '../components/navbar.vue';
import footerV from '../components/footer.vue';
import checksize from '../components/checksize.vue';
import toast from '../components/toastclient.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import Cookies from 'js-cookie';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper';
export default
    {
        components:
        {
            navbar,
            footerV,
            checksize,
            Swiper,
            SwiperSlide,
            toast


        },
        setup() {
            return {
                modules: [Pagination],
            };
        },
        data() {
            return {

                isShowSize: false,
                activeTab: 'tab1',
                products: [],
                cats: [],
                likes: [],
                size_id: '',
                number: 1
            }
        },
        mounted() {
            console.log(this.$route.params.id);
            this.getCat();
            this.getproduct();
            this.getlike();
        },
        methods:
        {

            showSize() {
                this.isShowSize = !this.isShowSize
            },
            formatCurrency(value) {
                let val = (value / 1).toFixed(0).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ'
            },
            async getCat() {
                try {
                    const result = await this.$axios.get(
                        `getcat`
                    );
                    this.cats = result.data;
                    console.log(result);

                } catch (e) {
                    console.log(e);
                }
            }, async getproduct() {
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
                    this.$refs.toast.showToast('Thêm thành công sản phẩm vào giỏ hàng.')

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
                console.log(id)
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

            addToCart2(product) {

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
                    this.$refs.toast.showToast('Thêm thành công sản phẩm vào giỏ hàng.')

                }

                // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
                let itemIndex = cart.items.findIndex(item => item.productId === product.id && item.sizeid === this.size_id);
                let item = itemIndex >= 0 ? cart.items[itemIndex] : null;
                if (!item) {
                    // Nếu sản phẩm chưa có trong giỏ hàng, tạo một sản phẩm mới
                    item = {
                        productId: product.id,
                        colorId: product.color_id,
                        sizeid: this.size_id,
                        price: product.price,
                        quantity: 1
                    };
                    cart.items.push(item);
                } else {
                    // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng sản phẩm lên 1
                    if (this.getSizeQuantity(item.productId, item.sizeid, item.colorId) > item.quantity) {
                        item.quantity = this.number;
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
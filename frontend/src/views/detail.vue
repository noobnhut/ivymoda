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
                            <label v-for="size in product.sizes">
                                <input type="radio" name="size" value="s">
                                <span class="text-uppercase">{{ size.size_name }}</span>
                            </label>

                        </div>

                        <div class="detail_checksize">
                            <a @click="showSize">Kiểm tra size của bạn</a>

                        </div>

                        <div class="detail_qty d-flex ">
                            <b>SỐ LƯỢNG:</b>
                            <input type="number">
                        </div>

                        <div class="detail_cart d-flex">
                            <button class="btn">
                                Thêm vào giỏ
                            </button>
                        </div>

                        <div class="detail_infor">
                            <h3>Chi tiết sản phẩm</h3>
                            <p>{{ product.information }}</p>


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

                    <swiper-slide v-for="product in products.filter(item => item.id_cat == this.$route.params.id_cat && item.id !=this.$route.params.id)  ">
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
                                        <a class="action"><i class="fa fa-heart"></i></a>
                                        <a class="action"><i class="fa fa-shopping-cart"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>

                </swiper>
            </div>
        </div>

    </div>

    <footerV />
</template>


<script>

import navbar from '../components/navbar.vue';
import footerV from '../components/footer.vue';
import checksize from '../components/checksize.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

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
            }
        },
        mounted() {
            console.log(this.$route.params.id);
            this.getCat();
            this.getproduct();
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
        }

    }

</script>
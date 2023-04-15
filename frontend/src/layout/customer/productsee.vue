<template>
    <div class="container" style="padding-top: 100px;">
        <div class="row">
            <div class="col-lg-4 col-xl-auto">
                <user_nav />
            </div>
            <div class="col-lg-8 col-xl">

                <div class="product_like">
                    <h3 class="d-flex fw-bold">Sản phẩm đã xem</h3>
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
                                        <router-link
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
                                            <a class="action"><i class="fa fa-heart"></i></a>
                                            <a class="dropup-center dropup action"><i class="fa fa-shopping-cart"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <ul class="dropdown-menu">
                                                        <li v-for="size in product.sizes">
                                                            <p
                                                                class="dropdown-item text-dark d-flex justify-content-center">
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
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

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
        },
        data() {
            return {

                sees: [],
                products: [],


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
        },
        methods: {
            async getsee() {
                let user = localStorage.getItem("user");
                const a = JSON.parse(user);
               
                    try {
                        const result = await this.$axios.get(
                            `getseen/` + a['user'].id
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
                    return this.sees.some((see) => see.id_product === product.id);
                });
            },
        }
    }
</script>
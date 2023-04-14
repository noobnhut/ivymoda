<template>
    <navbar />
    <div class="container" style="padding-top:80px;">
        <div class="product_view" v-for="catsex in catsexs.filter(item => item.id == this.$route.params.id)">
            <div class="title_product">
                IVY {{ catsex.cat_name }}
            </div>
        </div>
        <div class="row">
            <div class="col-xl-3" v-for="product in products.filter(item => item.id_catsex == this.$route.params.id)">
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
                        <h4 style="height:50px">
                            <router-link
                                :to="{ name: 'detail', params: { id: product.id, id_color: product.color_id, id_cat: product.id_cat } }">{{
                                    product.name
                                }} - {{ product.color_name }}</router-link>
                        </h4>

                        <div class="product-bottom-details">
                            <div class="product-price" style="height:50px">
                                <small>{{ formatCurrency(product.price) }}</small>{{ formatCurrency(product.price -
                                    (product.price *
                                        (product.discount) / 100)) }}
                            </div>
                            <div class="product-links">
                                <a class="action"><i class="fa fa-heart"></i></a>
                                <a class="dropup-center dropup action"><i class="fa fa-shopping-cart" type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <ul class="dropdown-menu">
                                            <li v-for="size in product.sizes">
                                                <p class="dropdown-item text-dark d-flex justify-content-center">
                                                    {{ size.size_name }}</p>
                                            </li>
                                        </ul>
                                    </i></a>
                            </div>
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

// import required modules
import { Pagination } from 'swiper';
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

                catsexs: [],
                products: [],


            }
        },
        mounted() {
            this.getcatsex();
            this.getproduct();
        },
        methods: {
            async getcatsex() {
                try {
                    const result = await this.$axios.get(
                        `getCatSex`
                    );
                    this.catsexs = result.data;
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
        }
    }
</script>
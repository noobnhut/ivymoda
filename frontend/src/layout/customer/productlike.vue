<template>
    <div class="container" style="padding-top: 100px;">
        <div class="row">
            <div class="col-lg-4 col-xl-auto">
                <user_nav />
            </div>
            <div class="col-lg-8 col-xl">

                <div class="product_like">
                    <h3 class="d-flex fw-bold">Sản phẩm đã thích</h3>
                    <swiper :spaceBetween="10" :modules="modules"
                        :breakpoints="{ 600: { slidesPerView: 1 }, 800: { slidesPerView: 2 }, 1000: { slidesPerView: 3 } }"
                        class="mySwiper">

                        <swiper-slide>
                            <div class="product-card">
                                <div class="product-tumb">
                                    <img src="https://pubcdn.ivymoda.com/files/news/2023/03/02/badaef8fa567f6dc7423b43b5764bb69.jpg"
                                        alt="">
                                </div>
                                <div class="product-details">
                                    <div class="d-flex justify-content-between">
                                        <span class="product-catagory">VÁY</span>
                                        <span class="product-catagory">NỮ</span>
                                    </div>
                                    <h4>
                                        <a>ÁO LỤA CỔ TÀU TRỤ</a>
                                    </h4>
                                    <div class="product-bottom-details">
                                        <div class="product-price"><small>100.00</small>200.00</div>
                                        <div class="product-links">
                                            <a class="action"><i class="fa fa-heart"></i></a>
                                            <a class="action"><i class="fa fa-shopping-cart"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>

                        <swiper-slide>
                            <div class="product-card">
                                <div class="product-tumb">
                                    <img src="https://pubcdn.ivymoda.com/files/news/2023/03/02/badaef8fa567f6dc7423b43b5764bb69.jpg"
                                        alt="">
                                </div>
                                <div class="product-details">
                                    <div class="d-flex justify-content-between">
                                        <span class="product-catagory">VÁY</span>
                                        <span class="product-catagory">NỮ</span>
                                    </div>
                                    <h4>
                                        <a>ÁO LỤA CỔ TÀU TRỤ</a>
                                    </h4>
                                    <div class="product-bottom-details">
                                        <div class="product-price"><small>100.00</small>200.00</div>
                                        <div class="product-links">
                                            <a class="action"><i class="fa fa-heart"></i></a>
                                            <a class="action"><i class="fa fa-shopping-cart"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>

                        <swiper-slide>
                            <div class="product-card">
                                <div class="product-tumb">
                                    <img src="https://pubcdn.ivymoda.com/files/news/2023/03/02/badaef8fa567f6dc7423b43b5764bb69.jpg"
                                        alt="">
                                </div>
                                <div class="product-details">
                                    <div class="d-flex justify-content-between">
                                        <span class="product-catagory">VÁY</span>
                                        <span class="product-catagory">NỮ</span>
                                    </div>
                                    <h4>
                                        <a>ÁO LỤA CỔ TÀU TRỤ</a>
                                    </h4>
                                    <div class="product-bottom-details">
                                        <div class="product-price"><small>100.00</small>200.00</div>
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
        setup() {
            return {
                modules: [Pagination],
            };
        },
    }
</script>
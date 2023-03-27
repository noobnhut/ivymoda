<template>
    <navbar />

    <div class="container" style="padding-top: 100px;">
        <checksize v-if="isShowSize" @cancelcheck="showSize()" />

        <div class="detail">
            <div class="row">

                <div class="col-md-6">
                    <div class="detail_img">
                        <img src="https://pubcdn.ivymoda.com/files/product/thumab/960/2023/03/21/30457b5ef78141d4760c6f897b4150cc.jpg"
                            alt="">
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="detail_information">
                        <h3>ÁO LỰA CỔ TÀU TRỤ</h3>

                        <div class="detail_price">
                            <b>790.000 đồng</b>
                        </div>

                        <div class="detail_color">
                            <b>Màu sắc: Trắng</b>
                        </div>

                        <div class="detail_size ">
                            <label>
                                <input type="radio" name="size" value="s">
                                <span class="text-uppercase">s</span>
                            </label>

                            <label>
                                <input type="radio" name="size" value="m">
                                <span class="text-uppercase">m</span>
                            </label>

                            <label>
                                <input type="radio" name="size" value="l">
                                <span class="text-uppercase">l</span>
                            </label>

                            <label>
                                <input type="radio" name="size" value="xl">
                                <span class="text-uppercase">xl</span>
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
                            <p>Áo kiểu cổ tròn, dáng ôm, cài bằng hàng khuy kim loại. Tay áo lửng, gấu tay bo tạo kiểu
                                phồng thêm phần nữ tính. Chất liệu vải ren họa tiết hoa cùng lớp lót vải trắng bên trong
                                mang lại sự thoải mái khi diện mà vẫn giữ được nét sang trọng, nữ tính của chiếc áo.</p>

                            <p>Một mẫu thiết kế dành cho những quý cô yêu thích sự đơn giản mà thanh lịch. Dáng áo ôm
                                với độ dài vừa phải giúp tôn dáng nàng, nàng có thể lựa chọn sơ vin hoặc thả dáng đều
                                được.</p>

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
                activeTab: 'tab1'

            }
        },

        methods:
        {
            showSize() {
                this.isShowSize = !this.isShowSize
            }
        }

    }

</script>
<template>
    <div class="product_view gall">
      <div class="title_product">
        THƯ VIỆN ẢNH SẢN PHẨM
      </div>
      <swiper :spaceBetween="5" :modules="modules"  :breakpoints="{ 600:{ slidesPerView:1 }, 800:{ slidesPerView:2},  1200:{ slidesPerView:3},1400:{ slidesPerView:4},}" class="mySwiper">
        <swiper-slide>
          <div class="product">
            <div class="thumb_product"><img src="https://pubcdn.ivymoda.com/files/news/2023/03/02/d151a55646d411b4d786cacb996d583a.jpg"
                alt=""></div>
          </div>
        </swiper-slide>
  
        <swiper-slide>
            <div class="product">
              <div class="thumb_product"><img src="https://pubcdn.ivymoda.com/files/news/2023/03/02/19c93d948050ab04ad9c6e419f709bf7.jpg"
                  alt=""></div>
            </div>
          </swiper-slide>

          <swiper-slide>
            <div class="product">
              <div class="thumb_product"><img src="https://pubcdn.ivymoda.com/files/news/2023/03/02/620ae27bd5bac6307f6b8292b51aa0cd.jpg"
                  alt=""></div>
            </div>
          </swiper-slide>

          <swiper-slide>
            <div class="product">
              <div class="thumb_product"><img src="https://pubcdn.ivymoda.com/files/news/2023/03/02/8750167289636337202d8cf452ac06dc.jpg"
                  alt=""></div>
            </div>
          </swiper-slide>


          <swiper-slide>
            <div class="product">
              <div class="thumb_product"><img src="https://pubcdn.ivymoda.com/files/news/2023/03/02/badaef8fa567f6dc7423b43b5764bb69.jpg"
                  alt=""></div>
            </div>
          </swiper-slide>

          
          <swiper-slide>
            <div class="product">
              <div class="thumb_product"><img src="https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/03/10/6af7a9600021e6622c566f4bdb7ef819.jpg"
                  alt=""></div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="product">
              <div class="thumb_product"><img src="https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/03/21/35371623f15cdd38b06d1a399ceadc90.jpg"
                  alt=""></div>
            </div>
          </swiper-slide>
      </swiper>
    </div>
  </template>
  <style>
  
  
  .gall .swiper-slide {
    text-align: center;
    background: #fff;
  
    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gall .swiper-slide img:hover
  {
    opacity: 0.8;
    cursor: pointer;
  }
  .gall .swiper-slide img {
    display: block;
    width: 100%;
    object-fit: cover;
    border: none;
  }
  
  .product {
    position: relative;
  }
  
  </style>
  <script>
  
  import { Swiper, SwiperSlide } from 'swiper/vue';
  
  // Import Swiper styles
  import 'swiper/css';
  
  import 'swiper/css/pagination';
  
  // import required modules
  import { Pagination } from 'swiper';
  
  export default {
    components: {
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
  
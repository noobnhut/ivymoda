<template>
  <div class="product_view">
    <div class="title_product">
      Danh sách sản phẩm
    </div>
    <swiper :spaceBetween="10" :modules="modules"  :breakpoints="{ 600:{ slidesPerView:1 }, 800:{ slidesPerView:2}, 1000:{ slidesPerView:3}, 1200:{ slidesPerView:4},1400:{ slidesPerView:5},}" class="mySwiper">
        
      <swiper-slide>
        <div class="product-card">
          <div class="product-tumb">
            <img src="https://pubcdn.ivymoda.com/files/news/2023/03/02/badaef8fa567f6dc7423b43b5764bb69.jpg" alt="">
          </div>
          <div class="product-details">   
            <div class="d-flex justify-content-between">
              <span class="product-catagory">VÁY</span>
              <span class="product-catagory">NỮ</span>
            </div>
            <h4><a>ÁO LỤA CỔ TÀU TRỤ</a></h4>
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
            <img src="https://pubcdn.ivymoda.com/files/news/2023/03/02/badaef8fa567f6dc7423b43b5764bb69.jpg" alt="">
          </div>
          <div class="product-details">   
            <div class="d-flex justify-content-between">
              <span class="product-catagory">VÁY</span>
              <span class="product-catagory">NỮ</span>
            </div>
            <h4><a>ÁO LỤA CỔ TÀU TRỤ</a></h4>
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
            <img src="https://pubcdn.ivymoda.com/files/news/2023/03/02/badaef8fa567f6dc7423b43b5764bb69.jpg" alt="">
          </div>
          <div class="product-details">   
            <div class="d-flex justify-content-between">
              <span class="product-catagory">VÁY</span>
              <span class="product-catagory">NỮ</span>
            </div>
            <h4><a>ÁO LỤA CỔ TÀU TRỤ</a></h4>
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
            <img src="https://pubcdn.ivymoda.com/files/news/2023/03/02/badaef8fa567f6dc7423b43b5764bb69.jpg" alt="">
          </div>
          <div class="product-details">   
            <div class="d-flex justify-content-between">
              <span class="product-catagory">VÁY</span>
              <span class="product-catagory">NỮ</span>
            </div>
            <h4><a>ÁO LỤA CỔ TÀU TRỤ</a></h4>
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
            <img src="https://pubcdn.ivymoda.com/files/news/2023/03/02/badaef8fa567f6dc7423b43b5764bb69.jpg" alt="">
          </div>
          <div class="product-details">   
            <div class="d-flex justify-content-between">
              <span class="product-catagory">VÁY</span>
              <span class="product-catagory">NỮ</span>
            </div>
            <h4><a>ÁO LỤA CỔ TÀU TRỤ</a></h4>
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
</template>
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

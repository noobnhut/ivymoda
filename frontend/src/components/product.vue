<template>
  <div class="product_view">
    <div class="title_product">
      Danh sách sản phẩm
    </div>
    <swiper :spaceBetween="5" :modules="modules"  :breakpoints="{ 600:{ slidesPerView:1 }, 800:{ slidesPerView:2}, 1000:{ slidesPerView:3}, 1200:{ slidesPerView:4},1400:{ slidesPerView:5},}" class="mySwiper">
      <swiper-slide>
        <div class="product">
          <div class="thumb_product"><img src="https://i.pinimg.com/736x/ac/61/6e/ac616eac8a162481a2bcf42b78c198ac.jpg"
              alt=""></div>
          <div class="info-product">
            <div class="list_color"></div>
            <h5 class="title_product_render">Sản phẩm bén</h5>
            <div class="price_product d-flex justify-content-around"><span class="int">50k/h</span> <span class="unint">100k/h</span></div>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="product">
          <div class="thumb_product"><img src="https://i.pinimg.com/736x/ac/61/6e/ac616eac8a162481a2bcf42b78c198ac.jpg"
              alt=""></div>
          <div class="info-product">
            <div class="list_color"></div>
            <h5 class="title_product_render">Sản phẩm bén</h5>
            <div class="price_product d-flex justify-content-around"><span class="int">50k/h</span> <span class="unint">100k/h</span></div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="product">
          <div class="thumb_product"><img src="https://i.pinimg.com/736x/ac/61/6e/ac616eac8a162481a2bcf42b78c198ac.jpg"
              alt=""></div>
          <div class="info-product">
            <div class="list_color"></div>
            <h5 class="title_product_render">Sản phẩm bén</h5>
            <div class="price_product d-flex justify-content-around"><span class="int">50k/h</span> <span class="unint">100k/h</span></div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="product">
          <div class="thumb_product"><img src="https://i.pinimg.com/736x/ac/61/6e/ac616eac8a162481a2bcf42b78c198ac.jpg"
              alt=""></div>
          <div class="info-product">
            <div class="list_color"></div>
            <h5 class="title_product_render">Sản phẩm bén</h5>
            <div class="price_product d-flex justify-content-around"><span class="int">50k/h</span> <span class="unint">100k/h</span></div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="product">
          <div class="thumb_product"><img src="https://i.pinimg.com/736x/ac/61/6e/ac616eac8a162481a2bcf42b78c198ac.jpg"
              alt=""></div>
          <div class="info-product">
            <div class="list_color"></div>
            <h5 class="title_product_render">Sản phẩm bén</h5>
            <div class="price_product d-flex justify-content-around"><span class="int">50k/h</span> <span class="unint">100k/h</span></div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="product">
          <div class="thumb_product"><img src="https://i.pinimg.com/736x/ac/61/6e/ac616eac8a162481a2bcf42b78c198ac.jpg"
              alt=""></div>
          <div class="info-product">
            <div class="list_color"></div>
            <h5 class="title_product_render">Sản phẩm bén</h5>
            <div class="price_product d-flex justify-content-around"><span class="int">50k/h</span> <span class="unint">100k/h</span></div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="product">
          <div class="thumb_product"><img src="https://i.pinimg.com/736x/ac/61/6e/ac616eac8a162481a2bcf42b78c198ac.jpg"
              alt=""></div>
          <div class="info-product">
            <div class="list_color"></div>
            <h5 class="title_product_render">Sản phẩm bén</h5>
            <div class="price_product d-flex justify-content-around"><span class="int">50k/h</span> <span class="unint">100k/h</span></div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="product">
          <div class="thumb_product"><img src="https://i.pinimg.com/736x/ac/61/6e/ac616eac8a162481a2bcf42b78c198ac.jpg"
              alt=""></div>
          <div class="info-product">
            <div class="list_color"></div>
            <h5 class="title_product_render">Sản phẩm bén</h5>
            <div class="price_product d-flex justify-content-around"><span class="int">50k/h</span> <span class="unint">100k/h</span></div>
          </div>
        </div>
      </swiper-slide>

    </swiper>
  </div>
</template>
<style>


.swiper-slide {
  text-align: center;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-slide img:hover
{
  opacity: 0.8;
  cursor: pointer;
}
.swiper-slide img {
  display: block;
  width: 16rem;
  object-fit: cover;
  border: none;
}

.product {
  position: relative;
}

.product .thumb_product {
  margin-bottom: 17px;
  position: relative;
}

.product .list_color {
  margin-bottom: 13px;
  display: flex;
  justify-content: space-between;
}
.product .title_product_render{
    color: #57585A;
    line-height: 16px;
    font-weight: 400;
    margin-bottom: 10px;
}
.product .int {
  color: #3E3E3F;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  text-decoration: none;
}

.product .unint
{
  text-decoration: line-through;
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

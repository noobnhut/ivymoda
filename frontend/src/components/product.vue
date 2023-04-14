<template>
  <div class="product_view" v-for="cat in cats">
    <div class="title_product">
      IVY {{ cat.cat_name }}
    </div>
    <swiper :spaceBetween="10" :modules="modules"
      :breakpoints="{ 600: { slidesPerView: 1 }, 800: { slidesPerView: 2 }, 1000: { slidesPerView: 3 }, 1200: { slidesPerView: 4 }, 1400: { slidesPerView: 5 }, }"
      class="mySwiper">

      <swiper-slide v-for="product in products.filter(item => item.id_cat == cat.id)">
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
              <router-link :to="{ name: 'detail', params: { id: product.id, id_color: product.color_id ,id_cat:product.id_cat} }">{{ product.name
              }} - {{ product.color_name }}</router-link>
            </h4>
            <div class="detail_size" style="padding-top: 10px;">
              <label v-for="size in product.sizes">
                  <input type="radio" name="size" value="s">
                  <span class="text-uppercase">{{ size.size_name }}</span>
              </label>

          </div>
            <div class="product-bottom-details">
              <div class="product-price" style="height:50px">
                <small>{{ formatCurrency(product.price) }}</small>{{ formatCurrency(product.price - (product.price * (product.discount) / 100)) }}
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
</template>
<script>

import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper';

export default {
  data() {
    return {
      products: [],
      cats: [],

    }
  },
  mounted() {
    this.getCat();
    this.getproduct();


  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  methods: {
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


  }
}

</script>

<template>
  <div class="product_view" v-for="cat in cats">
    <div class="title_product" >
      IVY {{cat.cat_name}}
    </div>
    <swiper :spaceBetween="10" :modules="modules"  :breakpoints="{ 600:{ slidesPerView:1 }, 800:{ slidesPerView:2}, 1000:{ slidesPerView:3}, 1200:{ slidesPerView:4},1400:{ slidesPerView:5},}" class="mySwiper">
        
      <swiper-slide v-for="product in products.filter(item=>item.id_cat==cat.id)">
        <div class="product-card" v-for="color in colors.filter(item=>item.color.id_product==product.id)">
          <div class="product-tumb">
            <img :src="color.url" alt="">
          </div>
          <div class="product-details">   
            <div class="d-flex justify-content-between">
              <span class="product-catagory">{{product.cat_name}}</span>
              <span class="product-catagory">{{product.sex_name}}</span>
            </div>
            <h4>
              <a>{{product.name }}</a>
             </h4>
             <div class="product-bottom-details">
                <div class="product-color" :style="{ backgroundColor: color.color.color_code }"></div>
             </div>
            <div class="product-bottom-details">
              <div class="product-price"><small>{{product.price}}</small>{{product.price-(product.price*(product.discount)/100)}}</div>
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
        colors:[]
      }
    },
  mounted() {
      this.getCat();
      this.getproduct();
      this.getcolor()
      
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
      async getcolor() {
        try {
          const result = await this.$axios.get(
            `renderColor`
          );
          this.colors = result.data;
          console.log(result);

        } catch (e) {
          console.log(e);
        }
      },
      
}
}

</script>

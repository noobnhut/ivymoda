<template>
  <div class="product_view" v-for="cat in cats">
    <div class="title_product" >
      IVY {{cat.cat_name}}
    </div>
    <swiper :spaceBetween="10" :modules="modules"  :breakpoints="{ 600:{ slidesPerView:1 }, 800:{ slidesPerView:2}, 1000:{ slidesPerView:3}, 1200:{ slidesPerView:4},1400:{ slidesPerView:5},}" class="mySwiper">
        
      <swiper-slide v-for="product in products.filter(item=>item.id_cat==cat.id)">
        <div class="product-card" v-for="color in product.colors">
          <div class="product-tumb" >
            <swiper  :modules="modules"  class="mySwiper">
              <swiper-slide v-for="img in color.images">
                <img :src="img.url" alt="">
              </swiper-slide>
            </swiper>
          </div>
          <div class="product-details">   
            <div class="d-flex justify-content-between">
              <span class="product-catagory">{{product.cat_name }} - {{product.sex_name}}</span>
              <span class="product-color" :style="{ backgroundColor: color.color_code }"></span>
            </div>
            <h4>
              <a>{{product.name }}</a>
             </h4>
            <div class="product-bottom-details">
              <div class="product-price"><small>{{formatCurrency(product.price)}}</small>{{formatCurrency(product.price-(product.price*(product.discount)/100))}}</div>
              <div class="product-links">
                <a class="action"><i class="fa fa-heart"></i></a>
                <a class="action" @click="addToCart(
                  product.id, 
                  product.name,
                  product.price,
                  product.cat_name,
                  product.sex_name,
                  color.id,
                  color.color_code,
                  color.images,
                  color.url,
                  )"><i class="fa fa-shopping-cart"></i></a>
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
import Cookies from 'js-cookie';
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
        let val = (value/1).toFixed(0).replace('.', ',')
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
      addToCart(productId, productName, price, catname, sexname, colorId, code, img, url) {
        // Kiểm tra đăng nhập
        const user_inf_gg = Cookies.get('user_inf_gg');
        const user_inf_fb = Cookies.get('user_inf_fb');
        const user = localStorage.getItem("user");
        if (!user_inf_gg && !user_inf_fb && !user) {
          alert('Bạn cần đăng nhập trước khi đặt hàng!');
          this.$router.push({ name: "login" });
        }

        // Đã đăng nhập 
        // Thêm sản phẩm vào giỏ hàng
        const cart = this.cart || {};
        let current = cart;
        const keys = [productId, colorId, productName, price, catname, sexname, code, img, url];
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          current[key] = current[key] || {};
          current = current[key];
        }
        current += 1;

        this.cart = cart;
        Cookies.set('cart', JSON.stringify(cart));
        console.log(cart);
      }
    }
}

</script>

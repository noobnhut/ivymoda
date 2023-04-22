<template>
  <div class="header fixed-top bg-white d-flex">
    <button class="btn_mobile" @click="onShowMobile">
      <i class="fa-solid fa-bars" style="color: #232424;"></i>
    </button>
    <div class="container d-flex justify-content-between">

      <div class="brand_logo d-flex ">
        <router-link :to="{ name: 'home' }" class="nav-link"> <img src="../assets/logo.png" alt=""></router-link>
      </div>

      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item"><router-link :to="{ name: 'home' }" class="nav-link">Trang chủ</router-link></li>
              <li class="nav-item"><router-link :to="{ name: 'about' }" class="nav-link">Về chúng tôi</router-link></li>
              <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item dropdown">
                    <a class="nav-link " role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Danh mục sản phẩm
                    </a>
                    <ul class="dropdown-menu dropdown-menu-light">
                      <div class="container-fluid d-flex ">
                        <li class="px-2" v-for="sex in sexs">
                          <a class="dropdown-item" style="font-weight: bold;">{{ sex.Sexes_value }}</a>
                          <div class="dropdown-item" v-for="catsex in catsexs.filter(item => item.id_sex === sex.id)">
                            <router-link class="text-decoration-none text-dark"
                              :to="{ name: 'productbycat', params: { id: catsex.id } }">{{ catsex.cat_name
                              }}</router-link>
                          </div>
                        </li>
                      </div>
                    </ul>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      <!--search gio hang information-->
      <div class="right_nav">
        <div>
          <form class="search_form" @submit.prevent="showProductList">
            <input type="text" name="search_query" placeholder="TÌM KIẾM SẢN PHẨM" autocomplete="off" minlength="1"
              v-model="searchQuery" @input="searchProducts">
            <ul class="show" v-show="showResults && searchResults.length > 0">
              <li v-for="product in searchResults" :key="product.id"
                @click="goToProductDetail(product.id, product.color_id, product.id_cat)">
                <img :src="product.images && product.images.length > 0 ? product.images[0].url : ''" alt=""
                  class="search-image">
                {{ product.name }}
              </li>
            </ul>
            <button class="search_button" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
        <div v-if="dropdown" class="dropdown item_action">
          <button @click="handleButtonClick" class="btn_custom" :class="btnClass">
            <i class="fa-solid fa-user"></i>
          </button>
          <ul class="dropdown-menu sub-action" >
            <div class="top-action">
              <a class="icon">
                <h3>Tài khoản của tôi</h3>
              </a>
            </div>
            <ul>
              <li><router-link class="text-decoration-none text-dark" :to="{ name: 'information' }"><i
                    style="margin-right: 10px;" class="fa-solid fa-user"></i>Thông tin tài
                  khoản</router-link></li>
              <li><router-link class="text-decoration-none text-dark" :to="{ name: 'productsee' }"><i
                    style="margin-right: 10px;" class="fa-solid fa-camera-retro"></i>Sản phẩm đã
                  xem</router-link></li>
              <li><router-link class="text-decoration-none text-dark" :to="{ name: 'productlike' }"><i
                    style="margin-right: 10px;" class="fa-solid fa-heart"></i>Sản phẩm yêu
                  thích</router-link></li>
              <li><router-link class="text-decoration-none text-dark" :to="{ name: 'control_order' }"><i
                    style="margin-right: 10px;" class="fa-solid fa-cart-shopping"></i>Theo dõi đơn hàng</router-link></li>
              <li><a class="text-decoration-none text-dark" @click="outWeb"><i style="margin-right: 10px;"
                    class="fa-solid fa-circle-xmark"></i>Đăng xuất</a></li>
            </ul>
          </ul>
        </div>
        <button class=" btn_custom position-relative" @click="onShow">
          <i class="fa-solid fa-bag-shopping"></i>
        </button>
      </div>

    </div>
    <carthome v-if="isShowModel" @cancel="onShow"></carthome>
    <mobile v-if="isShowMobile" @cancelmobile="onShowMobile"></mobile>
  </div>
  <!--mobile bottom-->
  <div class="navi_nav justify-content-center ">

    <div class="navi_item">
      <button type="button" class="btn position-relative" @click="onShow">
        <i class="fa-solid fa-bag-shopping"></i>
      </button>
      <p>Giỏ hàng</p>
    </div>

    <div class="navi_item">
      <router-link :to="{ name: 'information' }" class="nav-link"> <button type="button" class="btn position-relative">
          <i class="fa-solid fa-user"></i>
        </button></router-link>
      <p>Thông tin</p>
    </div>

    <div class="navi_item">
      <router-link :to="{ name: 'about' }" class="nav-link"> <button type="button" class="btn position-relative">
          <i class="fa-solid fa-circle-info"></i>
        </button></router-link>
      <p>Chúng tôi</p>
    </div>

  </div>
  <toast ref="toast"></toast>
</template>
<script>

import carthome from './carthome.vue';
import mobile from './mobile.vue';
import toast from './toastclient.vue';
export default {
  components:
  {
    mobile,
    carthome,
    toast

  },
  data() {
    return {
      buttonLabel: '',
      isShowModel: false,
      isShowMobile: false,
      sexs: [],
      catsexs: [],
      searchQuery: '',
      searchResults: [],
      showResults: false,
      isDropdownEnabled: false,
      dropdown:true

    }
  },
  mounted() {
    this.getSex();
    this.getcatsex();
    this.luuVaoLocalStorage();
    this.updateCartUserId();
  },
  computed: {
    btnClass() {
      return {
        btn_custom: true,
        'dropdown-toggle': this.isDropdownEnabled,
      }
    },

  },
  methods:
  {
    handleButtonClick() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        this.isDropdownEnabled = true;
        const btnEl = document.querySelector('.btn_custom');
        btnEl.setAttribute('data-bs-toggle', 'dropdown');
      } else {
        this.$refs.toast.showToast('Bạn chưa đăng nhập hãy đăng nhập !')
        setTimeout(() => {
          this.$router.push({ name: "login" });
        }, 1000);
        this.disableDropdown()
        this.dropdown=false
      }
    },
    disableDropdown() {
      const dropdownEl = document.querySelector('.dropdown-menu');
      if (dropdownEl.classList.contains('show')) {
        dropdownEl.classList.remove('show');
      }
      this.isDropdownEnabled = false;
      const btnEl = document.querySelector('.btn_custom');
      btnEl.classList.remove('dropdown-toggle');
      btnEl.removeAttribute('data-bs-toggle');
    },
    getUser() {
      let user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        const userId = "trans";
        return userId;
      }
      else {
        const userId = user.id;
        return userId;
      }

    },
    outWeb() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Xóa cookie "thong tin user fb"
      document.cookie = "user_inf_fb=; expires=" + new Date(0).toUTCString();
      document.cookie = "user_inf_gg=; expires=" + new Date(0).toUTCString();
      // Xóa cookie "token thong token"
      document.cookie = "token_fb=; expires=" + new Date(0).toUTCString();
      document.cookie = "token_gg=; expires=" + new Date(0).toUTCString();
      let carts = JSON.parse(sessionStorage.getItem('carts') || null);
      if (carts !== null) {
        sessionStorage.setItem('carts', '');
        this.$router.push({ name: 'login' });
        this.disableDropdown();
        this.dropdown=false
      }
      else {
        this.$router.push({ name: 'login' });
        this.disableDropdown()
        this.dropdown=false
       
      }
    },
    onShow() {
      this.isShowModel = !this.isShowModel
    },
    onShowMobile() {
      this.isShowMobile = !this.isShowMobile
    },
    async getSex() {
      try {
        const result = await this.$axios.get(
          `getsex`
        );
        this.sexs = result.data;
        console.log(result);

      } catch (e) {
        console.log(e);
      }
    },
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

    luuVaoLocalStorage() {
      // Lấy query string từ URL hiện tại
      const queryString = window.location.search;

      // Tạo một đối tượng URLSearchParams từ query string
      const urlParams = new URLSearchParams(queryString);

      // Lấy giá trị của tham số token_gg từ URL params
      const token_gg = urlParams.get('token_gg');

      // Lấy giá trị của tham số user_inf_gg từ URL params
      const user_inf_gg = urlParams.get('user_inf_gg');
      // Kiểm tra xem đã có giá trị token_gg và user_inf_gg hay chưa
      if (token_gg && user_inf_gg) {
        // Lưu thông tin token vào localStorage
        localStorage.setItem('token', token_gg);

        // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
        const user = JSON.parse(decodeURIComponent(user_inf_gg));

        // Lưu thông tin user vào localStorage
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
    async searchProducts() {
      if (this.searchQuery.length > 0) {
        const response = await this.$axios.get(`search?q=${this.searchQuery}`);
        const results = response.data;
        const filteredResults = results.filter(result => result.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        this.searchResults = filteredResults.map(result => ({
          id: result.id,
          name: result.name,
          url: result.url,
          images: result.images,
          id_cat: result.id_cat,
          color_id: result.color_id
        }));
        this.showResults = true;
      } else {
        this.searchResults = [];
        this.showResults = false;
      }
    },
    goToProductDetail(productId, colorId, categoryId) {
      // Chuyển hướng đến trang chi tiết sản phẩm tương ứng với giá trị "id" được truyền vào
      this.$router.push({ name: 'detail', params: { id: productId, id_color: colorId, id_cat: categoryId } });
    },
    showProductList() {
      if (this.searchQuery.trim().length > 0) {
        this.$router.push({ name: 'search-product-list', query: { q: this.searchQuery } });
        this.searchProducts();
      }
    },
    submitSearch() {
      this.showProductList();
    },
    updateCartUserId() {
      // Kiểm tra xem thông tin người dùng có tồn tại trong localStorage hay không
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        // Nếu thông tin người dùng tồn tại thì lấy giá trị userId từ localStorage
        const userId = user.id;
        console.log(userId);
        // Lấy danh sách các giỏ hàng từ sessionStorage
        let carts = JSON.parse(sessionStorage.getItem('carts') || '[]');
        // Duyệt qua danh sách các giỏ hàng và cập nhật giá trị userId của chúng
        carts.forEach(cart => {
          cart.userId = userId;
        });
        // Lưu lại danh sách các giỏ hàng đã được cập nhật vào sessionStorage
        sessionStorage.setItem('carts', JSON.stringify(carts));
      }
    },
  }
};
</script>
<style scoped>
.search_form {
  position: relative;
}

.search_form input {
  width: 100%;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search_form ul {
  position: absolute;
  top: 100%;
  /* tính từ input */
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 999;
  list-style-type: none;
  /* loại bỏ dấu chấm đầu dòng */
  margin: 0;
  /* đặt margin về 0 */
  padding: 0;
  /* đặt padding về 0 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.search_form ul.show {
  opacity: 1;
}

.search_form li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.search_form li:last-child {
  border-bottom: none;
}

.search_form li:hover {
  background-color: #f5f5f5;
}

.search_form button {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 50px;
  border: none;
  background-color: #ccc;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.search_form button:hover {
  background-color: #aaa;
}

.search_form i {
  font-size: 16px;
  margin: 0 auto;
  display: block;
  text-align: center;
  width: 20px;
}

.search_form i {
  font-size: 16px;
  margin: 0 auto;
  display: block;
  text-align: center;
  width: 20px;
  color: #666;
  /* màu sắc mặc định */
  transition: color 0.2s ease-in-out;
  /* hiệu ứng hover */
}

.search_form button:hover i {
  color: #333;
  /* màu sắc đậm hơn khi hover */
}

.search-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  vertical-align: middle;
}
</style>
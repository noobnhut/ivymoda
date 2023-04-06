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
                          <router-link to="/" class="dropdown-item"
                          v-for="catsex in catsexs.filter(item => item.id_sex === sex.id)"
                          >{{ catsex.cat_name }}</router-link >
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

      <div class="right_nav">
        <form class="search_form ">
          <button><i class="fa-solid fa-magnifying-glass"></i></button>
          <input type="text" placeholder="TÌM KIẾM SẢN PHẨM" autocomplete="off" min-lenght="1">
        </form>

        <div class="dropdown item_action">
          <button @click="handleButtonClick" class="btn_custom" :data-bs-toggle="buttonLabel" aria-expanded="false">
            <i class="fa-solid fa-user"></i>
          </button>
          <ul class="dropdown-menu sub-action">
            <div class="top-action">
              <a class="icon">
                <h3>Tài khoản của tôi</h3>
              </a>
            </div>
            <ul>
              <li><a><i class="icon-ic_avatar-1"></i>Thông tin tài khoản</a></li>
              <li><a><i class="icon-ic_glasses"></i>Sản phẩm đã
                  xem</a></li>
              <li><a><i class="icon-ic_heart"></i>Sản phẩm yêu
                  thích</a></li>
              <li><a @click="outWeb"><i class="icon-logout"></i>Đăng xuất</a></li>
            </ul>
          </ul>
        </div>

        <button type="button" class="btn position-relative" @click="onShow">
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
      <button type="button" class="btn position-relative">
        <i class="fa-solid fa-user"></i>
      </button>
      <p>Thông tin cá nhân</p>
    </div>

    <div class="navi_item">
      <router-link :to="{ name: 'about' }" class="nav-link"> <button type="button" class="btn position-relative">
          <i class="fa-solid fa-circle-info"></i>
        </button></router-link>
      <p>Về chúng tôi</p>
    </div>

  </div>
</template>
<style></style>
<script>
import carthome from './carthome.vue';
import mobile from './mobile.vue';
export default {
  components:
  {
    mobile,
    carthome

  },
  data() {
    return {
      buttonLabel: '',
      isShowModel: false,
      isShowMobile: false,
      sexs: [],
      catsexs: []
    }
  },
  mounted() {
    this.getSex();
    this.getcatsex();
   
  },
  methods:
  {
    handleButtonClick() {
      let user = localStorage.getItem("user");
      if (user) {
  // Thông tin user đã tồn tại trong localstorage, cho phép truy cập
  this.buttonLabel = 'dropdown'
} else {
  // Kiểm tra cookies
  let cookies = document.cookie.split(";");

  let userCookie = cookies.filter((cookie) => cookie.trim().startsWith("user="))[0];

  if (userCookie) {
    // Thông tin user đã tồn tại trong cookies, cho phép truy cập
    this.buttonLabel = 'dropdown'
  } else {
    // Không tìm thấy thông tin user trong cả localstorage và cookies, yêu cầu đăng nhập
    alert("Bạn chưa đăng nhập");
    this.$router.push({ name: "login" });
  }
}

      
    },
    outWeb()
    {
      this.$router.push({ name: 'login' });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
       // Xóa cookie "thong tin user fb"
      document.cookie = "user_info_fb=; expires=" + new Date(0).toUTCString();
      document.cookie = "user_info_google=; expires=" + new Date(0).toUTCString();
      // Xóa cookie "token thong token"
      document.cookie = "token_fb=; expires=" + new Date(0).toUTCString();
      document.cookie = "token_google=; expires=" + new Date(0).toUTCString();

      this.$router.push({ name: 'login' });
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
   
  }
};
</script>

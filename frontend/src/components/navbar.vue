<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white py-4 fixed-top ">
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }" class="navbar-brand mx-auto"><img src="../assets/logo.png"
          alt="Logo"></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link">Trang chủ</router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{ name: 'about' }" class="nav-link">Về chúng tôi</router-link>
          </li>

        </ul>

        <form class="d-flex  ">
          <div class="search-box">
            <div class="logo">
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <div class="input-box">
              <input type="text" placeholder="TÌM KIẾM SẢN PHẨM" autocomplete="off" minlength="1">
            </div>
          </div>

          <div class="btn-group order-lg-2 nav-btns user-dropdown">
            <button class="btn" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
              <i class="fa-regular fa-user"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
              <li><a class="dropdown-item" @click=" handleButtonClick">{{buttonLabel}}</a></li>
              
            </ul>
          </div>
         
          <div class="order-lg-2 nav-btns">
            <button type="button" class="btn position-relative" @click="onShow" >
              <i class="fa-solid fa-bag-shopping" ></i>
            </button>      
          </div>
        </form>
        <carthome v-if="isShowModel" @cancel="onShow"></carthome> 

        
      </div>
    </div>
  </nav>
</template>

<style>
img
{
  border: none;
    max-width: 100%;
    height: auto;
}
.user-dropdown :hover,
.user-dropdown :focus
{
  outline: none;
  border: none;
}
.user-dropdown
{
  padding-bottom: 0.4rem;
  padding-left: 0.1rem;
}
.user-dropdown .dropdown-menu {
  left: 50% !important;
  transform: translateX(-70%) !important;
  padding: 0.6rem;
}
</style>

<script>
import carthome from './carthome.vue';
export default {
  components:
  {
    carthome
  },
  data() {
    return {
      buttonLabel: 'Đăng nhập',
      isShowModel:false
    }
  },
  computed: {

    buttonLabel() {
      let user = localStorage.getItem("user");
      if (user) {
        this.buttonLabel = 'Đăng xuất';

      } else {
        this.buttonLabel = 'Đăng nhập';
      }
      return this.buttonLabel
    },
  },
  methods:
  {
    handleButtonClick() {
      if (this.buttonLabel == 'Đăng nhập') {
        this.$router.push({ name: 'login' });
      }

      if ((this.buttonLabel == 'Đăng xuất')) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        this.$router.push({ name: 'login' })
      }
    },
    onShow()
    {
      this.isShowModel=!this.isShowModel
    }
  }
};
</script>

<style>
a:hover {
  cursor: pointer;
}
</style>
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

          <div class="order-lg-2 nav-btns">
            <button type="button" class="btn position-relative" >
              <i class="fa-regular fa-user"></i>
            </button>          
          </div>

          <div class="order-lg-2 nav-btns">
            <button type="button" class="btn position-relative" >
              <i class="fa-solid fa-bag-shopping"></i>
            </button>
            
          </div>
        </form>

        
      </div>
    </div>
  </nav>
</template>

<script>
import '../assets/client.css'
export default {
  data() {
    return {
      buttonLabel: 'Đăng nhập'
    }
  },
  computed: {
    buttonLabel() {
      let user = localStorage.getItem("user-info");
      if (user) {
        this.buttonLabel = 'Đăng xuất'

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
        this.$router.push({ name: 'login_client' })
      }
      else if ((this.buttonLabel == 'Đăng xuất')) {
        localStorage.removeItem('user-info')
        this.$router.push({ name: 'login_client' })
      }
    },
    checkCart() {
      let user = localStorage.getItem("user-info")
      if (user) {
        this.$router.push({ name: 'cart' })
      }
      else {
        alert('Hãy đăng nhập để xem giỏ hàng')
      }
    }
  }
};
</script>

<style>
a:hover {
  cursor: pointer;
}
</style>
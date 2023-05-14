<template>
  <div class="auth2 auth-forgotpass">
    <div class="auth-container">
      <div class="auth-forgotpass">
        <div class="auth__login auth__block">
          <h3 class="auth__title">Bạn muốn tìm lại mật khẩu?</h3>
          <div class="auth__login__content">
            <p class="auth__description">
              Vui lòng nhập mail để xác thực và nhận lại mã bảo mật
            </p>
            <form class="auth__form" @submit.prevent="sendCodeEmail">
              <div class="form-group">
                <input class="form-control" type="email" v-model="email" name="customer_phone" placeholder="Nhập email" />
              </div>
              <div class="form-group">
                <router-link class="text-decoration-none" to="/reset/step2">Nhớ mã dự phòng</router-link>
              </div>
              <div class="auth__form__buttons">
                <button type="submit" class="btn btn--large">Gửi đi</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <toast ref="toast"></toast>
</template>
  
<script>
import '../../assets/login.css'
import toast from '../../components/toastclient.vue';
export default {
  data() {
    return {
      email: ''
    }
  },
  components: {
    toast
  },
  methods: {
    sendCodeEmail() {
  this.$axios.post(`send-code`, { email: this.email })
    .then(response => {
      console.log(response.data);
      this.$refs.toast.showToast('Đã gửi mã dự phòng tới email: ' + this.email);
      setTimeout(() => {
        this.$router.push({ name: 'step2' });
      }, 2500); // Trì hoãn chuyển trang trong 2.5 giây để hiển thị thông báo toast
    })
    .catch(error => {
      console.error('Lỗi: ' + error);
    });
}

  }
}
</script>

<style>
.auth2 {
  margin: 20px;
}

.img_capcha {
  border: 1px solid #E7E8E9;
  margin-top: 15px;
  padding: 5px 10px;
  line-height: 0;
  display: inline-block;
}
</style>
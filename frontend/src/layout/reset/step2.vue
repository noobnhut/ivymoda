<template>
  <div class=" auth2 auth-forgotpass">
    <div class="auth-container">
      <div class="auth-forgotpass">
        <div class="auth__login auth__block">
          <h3 class="auth__title">Bạn muốn tìm lại mật khẩu?</h3>
          <div class="auth__login__content">
            <p class="auth__description">
              Vui lòng nhập lại mật khẩu dự phòng và email hệ thống sẽ xác nhận và cho bạn cập nhập lại mật khẩu mới
            </p>
            <form class="auth__form" role="login" @submit.prevent="sendEmailAuth" name="frm_register">
              <div class="form-group">
                <input class="form-control" type="email" name="customer_phone" placeholder="Nhập địa chỉ email"
                  v-model="email" />
              </div>
              <div class="form-group">
                <input class="form-control" type="text" name="customer_phone" placeholder="Mật khẩu bảo mật"
                  v-model="question" />
              </div>
              <div class="form-group">
                <input class="form-control" type="text" name="customer_phone" placeholder="Mật khẩu mới"
                  v-model="password" />
              </div>
              <div class="auth__form__buttons">
                <button type="submit" class="btn btn--large">Cập nhập mật khẩu</button>
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
export default {
  data() {
    return {
      email: '',
      password: '',
      question: ''
    }
  },
  methods: {
    sendEmailAuth() {
      console.log(this.question);
      this.$axios.post(`resetPassword`, { email: this.email, question: this.question, password: this.password })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
          if (error.response && error.response.data) {
            const { message } = error.response.data;
            alert(message);
          } else {
            alert('Lỗi khi kết nối đến server');
          }
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
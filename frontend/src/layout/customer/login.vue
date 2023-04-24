<template >
  <div class="auth">
    <div class="auth-container">
      <div class="auth-row">
        <div class="auth__login auth__block">
          <h3 class="auth__title">Bạn đã có tài khoản IVY</h3>
          <div class="auth__login__content">
            <p class="auth__description">
              Nếu bạn đã có tài khoản, hãy đăng nhập để tích lũy điểm thành viên và nhận được những ưu đãi tốt hơn!
            </p>
            <div class="social-container">
            
              <a @click="socialLogin('google')" class="social"><i class="fab fa-google-plus-g"
                  style="color: red;"></i></a>
            </div>
            <div class="auth__form" role="login" name="frm_customer_account_email">
              <div class="form-group">
                <input class="form-control" name="customer_account" type="text" placeholder="Email" v-model="email">
              </div>
              <div class="form-group">
                <input class="form-control" name="customer_password" type="password" placeholder="Mật khẩu"
                  v-model="password">
              </div>

              <div class="auth__form__buttons">
                <button class="btn btn--large " @click="login">Đăng nhập</button>
              </div>
            </div>
          </div>
        </div>
        <div class="auth__register auth__block">
          <h3 class="auth__title">Khách hàng mới của IVY moda</h3>
          <div class="auth__login__content">
            <p class="auth__description">
              Nếu bạn chưa có tài khoản trên ivymoda.com, hãy sử dụng tùy chọn này để truy cập biểu mẫu đăng ký.
            </p>
            <p class="auth__description">
              Bằng cách cung cấp cho IVY moda thông tin chi tiết của bạn, quá trình mua hàng trên ivymoda.com sẽ là một
              trải nghiệm thú vị và nhanh chóng hơn!
            </p>
            <div class="auth__form__buttons">
              <router-link class="text-decoration-none" :to="{ name: 'register' }"><button class="btn btn--large">Đăng
                  ký</button></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <toast ref="toast"></toast>

</template>
<style>
.social-container {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.social-container .social {
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  text-decoration: none;
  width: 40px;
}
</style>
<script>
import '../../assets/login.css';
import toast from '../../components/toastclient.vue';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  components: {
toast

},
  methods: {
    async login() {
      try {
        const login = await this.$axios.post(`login`, {
          email: this.email,
          password: this.password,
        });
        if (login.status === 200) {
          // Lưu thông tin người dùng vào localStorage hoặc sessionStorage
          localStorage.setItem('user', JSON.stringify(login.data));
          localStorage.setItem('token', login.data.token);
          this.$refs.toast.showToast('Đăng nhập thành công.');

          // Chuyển hướng đến trang chính của ứng dụng
          this.$router.push({ name: 'information' });
          this.handleCart();
          this.$refs.toast.showToast('Đăng nhập thành công.');

        }
      } catch (error) {
        // Xử lý lỗi nếu có
        this.$refs.toast.showToast('Đăng nhập thất bại');

        console.log(error);
      }
    },
    socialLogin(provider) {
      // Thực hiện đăng nhập bằng cách chuyển hướng đến trang đăng nhập của nhà cung cấp
      switch (provider) {
        case 'google':
          this.$router.push({ name: 'google-auth' });
          
          break;
        case 'facebook':
          this.$router.push({ name: 'facebook-auth' });
          break;
        default:
          break;
      }
    },
    handleCart() {

      let cart = JSON.parse(sessionStorage.getItem('carts') || []);
      let user = localStorage.getItem("user");
      const a = JSON.parse(user);
      if (cart !== null) {
        cart[0]['userId'] = a.id;
      }
      if (cart == null) {
        sessionStorage.setItem('carts', '');
      }
      sessionStorage.setItem('carts', JSON.stringify(cart));
    },

  },
};
</script>

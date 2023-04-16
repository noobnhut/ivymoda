<template >
  <div class="container-fluid" style="padding: 120px;">
    <div class="row">
      <div class="col-xl-6">
        <div class="content-login" style="border-right: 1px solid rgb(194, 190, 190);">
          <h3>Bạn đã có tài khoản IVY</h3>
          <p>Nếu bạn đã có tài khoản, hãy đăng nhập để tích lũy điểm thành <br>viên và nhận được những ưu đãi tốt hơn!</p>
          <div class="mb-3">
            <input type="email" class="form-control" placeholder="Nhập địa chỉ email:" v-model="email">
          </div>
          <div class="mb-3">
            <input type="password" class="form-control" placeholder="Nhập mật khẩu:" v-model="password">
          </div>

          <button @click="login" class="btn">Đăng nhập</button>
          <div class="login-container">
            <p>Hoặc tiếp tục với</p>
            <div class="login-buttons">
              <button class="login-button" @click="socialLogin('google')">Đăng nhập bằng Google</button>
              <button class="login-button" @click="socialLogin('facebook')">Đăng nhập bằng Facebook</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-6">
        <div class="content-login">
          <h3>Khách hàng mới của IVY moda</h3>
          <p>Nếu bạn chưa có tài khoản trên ivymoda.com,
            hãy sử dụng tùy<br> chọn này để truy cập biểu mẫu đăng ký.
            <br>
            Bằng cách cung cấp cho IVY moda thông tin chi tiết của bạn, <br>quá trình mua hàng trên ivymoda.com sẽ là một
            trải
            nghiệm <br>thú vị và nhanh chóng hơn!
          </p>

          <router-link :to="{ name: 'register' }"><button class="btn">Đăng ký</button></router-link>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import '../../assets/login.css';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
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
          // Chuyển hướng đến trang chính của ứng dụng
          this.$router.push({ name: 'home' });    
          this.handleCart();      
        }
      } catch (error) {
        // Xử lý lỗi nếu có
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
    handleCart()
    {
     
      let cart = JSON.parse(sessionStorage.getItem('carts')|| []);
      let user = localStorage.getItem("user");
      const a = JSON.parse(user);
      if(cart!==null)
      {      
       cart[0]['userId']=a['user'].id;
      }
      if(cart==null)
      {
        sessionStorage.setItem('carts', '');
      }
      sessionStorage.setItem('carts', JSON.stringify(cart));
    }


  },
};
</script>

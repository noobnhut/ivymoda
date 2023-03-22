<template>
    <div class="containter-fluid" style="padding: 120px;">
        <div class="content-login">
            <h3>Bạn đã có tài khoản IVY</h3>
            <p>Nếu bạn đã có tài khoản, hãy đăng nhập để tích lũy điểm thành <br>viên và nhận được những ưu đãi tốt hơn!</p>
            <form>
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Họ và tên:" v-model="username">
                </div>

                <div class="mb-3">
                    <input type="email" class="form-control" placeholder="Nhập địa chỉ email:" v-model="email">
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="register-summary__overview">
                        <h6>Thông tin mật khẩu</h6>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="form-group">
                                <label>Mật khẩu:<span style="color: red">*</span></label>
                                <input class="form-control" type="password"  name="customer_pass1" placeholder="Mật khẩu..." v-model="password">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="form-group">
                                <label>Nhập lại mật khẩu:<span style="color: red">*</span></label>
                                <input class="form-control" type="password"  name="customer_pass2" placeholder="Nhập lại mật khẩu..." v-model="repassword">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <button id="bnt_register" class="btn btn--large" type="submit" style="width: 100%;margin-top: 15px" @click="register">Đăng ký</button>
                        </div>
                    </div>
                </div>

                <button class="btn" @click="register">Đăng ký</button>

            </form>
        </div>

    </div>
</template>

<script>
import '../../assets/login.css';

export default
    {
        data() {
            return {
                username: '',
                password: '',
                address: '',
                phone: '',
                email: '',
                firstname:'',
                repassword:''
            };
        },

        methods:
        {
            async registerUser() {
                try {
                    const response = await axios.post('register', {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                        address: this.address,
                        phone: this.phone
                    });
                    console.log(response.data);
                    alert('Đăng ký thành công!');
                } catch (error) {
                    console.error(error);
                    alert('Đăng ký thất bại!'+ error);
                }
            }
        }
    }
</script>
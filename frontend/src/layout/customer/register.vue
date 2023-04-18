
<template >
    <div class="auth">
        <div class="auth-container">
            <div class="auth-row">
                <div class="auth__login auth__block">
                    <h3 class="auth__title">Bạn đã có tài khoản IVY</h3>
                    <div class="auth__login__content">
                        <p class="auth__description">
                            Nếu bạn chưa có tài khoản, hãy đăng ký để tích lũy điểm thành viên và nhận được những ưu đãi tốt
                            hơn!
                        </p>
                        <div class="auth__form" role="login" name="frm_customer_account_email">
                            <div class="form-group">
                                <input class="form-control" name="customer_account" type="text" placeholder="Email"
                                    v-model="email">
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="customer_password" type="password" placeholder="Mật khẩu"
                                    v-model="password">
                                   
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="customer_password" type="text" placeholder="Họ và tên"
                                    v-model="username">
                            </div>
                            <div class="form-group">
                                <textarea class="form-control" name="customer_password" type="text-aria"
                                    placeholder="Địa chỉ" v-model="address"></textarea>
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="customer_password" type="tel"
                                    placeholder="Số điện thoại" v-model="phone">
                            </div>
                            <div class="auth__form__buttons">
                                <button class="btn btn--large " @click="register">Đăng ký</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="auth__register auth__block">
                    <h3 class="auth__title">Khách hàng mới của IVY moda</h3>
                    <div class="auth__login__content">
                        <p class="auth__description">
                            Nếu bạn đã có tài khoản trên ivymoda.com, hãy sử dụng tùy chọn này để truy cập biểu mẫu đăng
                            nhập.
                        </p>
                        <p class="auth__description">
                            Bằng cách cung cấp cho IVY moda thông tin chi tiết của bạn, quá trình mua hàng trên ivymoda.com
                            sẽ là một trải nghiệm thú vị và nhanh chóng hơn!
                        </p>
                        <div class="auth__form__buttons">
                            <router-link class="text-decoration-none" :to="{ name: 'login' }"><button
                                    class="btn btn--large">Đăng nhập</button></router-link>
                        </div>
                    </div>
                </div>
            </div>
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
                repassword: '',
                emailError: ''
            };
        },
       
        methods:
        {
            async register() {
                // Validate the form inputs
                if (!this.validateForm()) {
                    return;
                }

                try {
                    // Send the registration request
                    const register = await this.$axios.post(
                        `register`,
                        {
                            username: this.username,
                            password: this.password,
                            email: this.email,
                            phone: this.phone,
                            address: this.address
                        }
                    );

                    // If the registration is successful, redirect the user to the login page
                    if (register.status === 200) {
                        this.$router.push({ name: 'login' });
                    }
                } catch (error) {
                    // Handle any errors that occur during the registration process
                    console.error(error);
                    alert('An error occurred during registration. Please try again later.');
                }
            },
            validateForm() {
                // Check if all the required fields are not empty
                if (!this.email || !this.password || !this.username || !this.phone || !this.address) {
                    alert('Không được để trống');
                    return false;
                }

                // Validate email format using regular expression
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.email)) {
                    alert('Email nhập vào không đúng chuẩn.');
                    return false;
                }

                const TestPasss = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(this.password);
                if (!TestPasss) {
                    alert('Mật khẩu chưa đủ chuẩn');
                    return false;
                }

                // Validate phone number format
                const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
                if (!phoneRegex.test(this.phone)) {
                    alert('Số điện thoại phải đủ 10 số.');
                    return false;
                }

                return true;
            },




        }
    }
</script>
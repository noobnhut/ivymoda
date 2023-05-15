
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
                                @keyup.enter="register" v-model="email">
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="customer_password" type="password" placeholder="Mật khẩu"
                                @keyup.enter="register" v-model="password">

                            </div>
                            <div class="form-group">
                                <input class="form-control" name="customer_password" type="text" placeholder="Họ và tên"
                                @keyup.enter="register"   v-model="username">
                            </div>
                            <div class="form-group">
                                <h6 class="small-text">mã dự phòng dùng để khôi phục tài khoản khi quên mật khẩu</h6>
                                <input class="form-control" name="customer_password" type="text" placeholder="Mã dự phòng"
                                @keyup.enter="register" v-model="question">
                            </div>
                            <div class="form-group">
                                <textarea class="form-control" name="customer_password" type="text-aria"
                                @keyup.enter="register" placeholder="Địa chỉ" v-model="address"></textarea>
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="customer_password" type="tel" placeholder="Số điện thoại"
                                @keyup.enter="register" v-model="phone">
                            </div>
                            <div class="auth__form__buttons">
                                <button class="btn btn--large" :class="{ 'loading': isRegistering }" @click="register" 
                                    
                                    :disabled="isRegistering">
                                    <span v-if="!isRegistering">Đăng ký</span>
                                    <span v-else><i class="fa fa-spinner fa-spin"></i> Đang đăng ký...</span>
                                </button>
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
    <toast ref="toast"></toast>
</template>

<script>
import '../../assets/login.css';
import toast from '../../components/toast.vue';
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
                emailError: '',
                question: '',
                isRegistering: false
            };
        },
        components: {
            toast
        },
        methods:
        {
            async register() {
                // Validate the form inputs
                if (!this.validateForm()) {
                    return;
                }
                this.isRegistering = true;
                try {
                    // Send the registration request
                    const register = await this.$axios.post(
                        `register`,
                        {
                            username: this.username,
                            password: this.password,
                            email: this.email,
                            phone: this.phone,
                            address: this.address,
                            question: this.question
                        }
                    );
                    // If the registration is successful, redirect the user to the login page
                    if (register.status === 200) {
                        this.$router.push({ name: 'login' });
                    }
                    this.isRegistering = false;
                } catch (error) {

                    // Handle any errors that occur during the registration process
                    if (error.response && error.response.data) {
                        const { message } = error.response.data;
                        this.$refs.toast.showToast(message);
                        this.isRegistering = false;
                    } else {
                        this.$refs.toast.showToast('lỗi server');
                    }
                }
            },
            validateForm() {
                // Check if all the required fields are not empty
                if (!this.email) {
                    this.$refs.toast.showToast('Email không được bỏ trống');
                    return false;
                } else if (!this.password) {
                    this.$refs.toast.showToast('Mật khẩu không được bỏ trống');
                    return false;
                } else if (!this.username) {
                    this.$refs.toast.showToast('Tên người dùng không được bỏ trống');
                    return false;
                } else if (!this.question) {
                    this.$refs.toast.showToast('Mã dự phòng không được bỏ trống');
                    return false;
                } else if (!this.phone) {
                    this.$refs.toast.showToast('Số điện thoại không được bỏ trống');
                    return false;
                } else if (!this.address) {
                    this.$refs.toast.showToast('Địa chỉ không được bỏ trống');
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

<style>
.small-text {
    font-size: 77%;
}

.loading {
    position: relative;
}

.loading i.fa-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
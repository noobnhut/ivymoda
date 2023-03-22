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

                <div class="mb-3">
                    <input type="password" class="form-control" placeholder="Nhập mật khẩu:" v-model="password">
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Địa chỉ:" v-model="address">
                </div>

                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Số điện thoại:" v-model="phone">
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
                email: ''
            };
        },

        methods:
        {
            async register() {
                const register = await axios.post(
                    `register`,
                    {
                        username: this.username,
                        password: this.password,
                        email: this.email,
                        phone:this.phone,
                       address:this.address
                    });
                console.warn(register)
                if (register.status == 200) {
                    this.$router.push({ name: 'login' })
                }

            },
        }
    }
</script>
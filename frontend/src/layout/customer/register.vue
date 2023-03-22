<template>
    <div class="containter-fluid" style="padding: 120px;">
        <div class="content-register">
            <h3>Đăng ký</h3> 
            
            <div class="row">
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="register-summary__overview">
                        <h6>Thông tin khách hàng</h6>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label>Họ:<span style="color: red">*</span></label>
                                <input type="text" class="form-control"  name="customer_firstname" placeholder="Họ..." style="width: 100%" v-model="firstname">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label>Tên:<span style="color: red">*</span></label>
                                <input class="form-control" type="text"  name="customer_display_name" placeholder="Tên..." style="width: 100%" v-model="username">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label>Email:<span style="color: red">*</span></label>
                                <input id="email" class="form-control" type="email" name="customer_email"  placeholder="Email..." style="width: 100%" v-model="email">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label>Điện thoại:<span style="color: red">*</span></label>
                                <input class="form-control" type="text"  name="customer_phone" placeholder="Điện thoại..." style="width: 100%" v-model="phone">
                            </div>
                        </div>
                    </div>
                  
              
                   
                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="form-group">
                                <label>Địa chỉ:<span style="color: red">*</span></label>
                                <textarea class="form-control" name="address" v-model="address"></textarea>
                            </div>
                        </div>
                    </div>
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

               

            </div>
        </div>

    </div>
    <div id="notifikation"></div>
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
            async register() {
                const register = await this.$axios.post(
                    `register`,
                    {
                        username: this.username,
                        password: this.password,
                        email: this.email,
                        phone:this.phone,
                       address:this.address
                    });
                  
                if (register.status == 200) { 
            
                    this.$router.push({ name: 'login' })
                }

            },
        }
    }
</script>
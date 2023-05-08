<template>
    <div class=" auth2 auth-forgotpass">
        <div class="auth-container">
            <div class="auth-forgotpass">
                <div class="auth__login auth__block">
                    <h3 class="auth__title">Bạn muốn tìm lại mật khẩu?</h3>
                    <div class="auth__login__content">
                        <p class="auth__description">
                            Vui lòng nhập mail để xác thực và nhận lại mã bảo mật
                        </p>
                        <form class="auth__form" role="login" enctype="application/x-www-form-urlencoded"
                            name="frm_register" method="post" action="">
                            <div class="form-group">
                                <input class="form-control" type="text" name="customer_phone"
                                    placeholder="Mật khẩu bảo mật" />
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="captcha" type="text"
                                    placeholder="Nhập kí tự trong hình vào ô sau">
                            </div>
                            <p class="img_capcha">
                                <img src="https://ivymoda.com/ajax/captcha" border="0"
                                    class="img-responsive">
                            </p>
                           <div class="form-group">
                            <router-link class="text-decoration-none" to="/reset/step2">Nhớ mã bảo mật</router-link>

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
</template>

<script>
import '../../assets/login.css'
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
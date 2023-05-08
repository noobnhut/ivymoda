<template>
    <div class=" auth2 auth-forgotpass">
        <div class="auth-container">
            <div class="auth-forgotpass">
                <div class="auth__login auth__block">
                    <h3 class="auth__title">Bạn muốn tìm lại mật khẩu?</h3>
                    <div class="auth__login__content">
                        <p class="auth__description">
                            Vui lòng nhập lại mật khẩu dự phòng hệ thống sẽ xác nhận và cho bạn cập nhập lại mật khẩu mới
                        </p>
                        <form class="auth__form" role="login" enctype="application/x-www-form-urlencoded"
                            name="frm_register" method="post" action="">
                            <div class="form-group">
                                <input class="form-control" type="text" name="customer_phone"
                                    placeholder="Mật khẩu bảo mật" />
                            </div>
                            <div class="form-group">
                                <input class="form-control" type="text" name="customer_phone"
                                    placeholder="Mật khẩu mới" />
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="captcha" type="text"
                                    placeholder="Nhập kí tự trong hình vào ô sau">
                            </div>
                            <p class="img_capcha">
                                <img src="https://ivymoda.com/ajax/captcha" border="0"
                                    class="img-responsive">
                            </p>
                            <div class="auth__form__buttons">
                                <button type="submit" class="btn btn--large">Cập nhập mật khẩu</button>
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
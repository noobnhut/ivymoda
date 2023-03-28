<template>
    <div class="container" style="padding-top: 100px;">
        <div class="row">
            <div class="col-lg-4 col-xl-auto">
                <user_nav />
            </div>

            <div class="col-lg-8 col-xl">
                <div class="row">
                    <div class="col-md-7">
                        <h3 class="d-flex fw-bold">Thông tin cá nhân của bạn</h3>
                        <div class="row form-group" style="padding-top: 10px;">
                            <div class="col col-label">
                                <label>Họ và tên:</label>
                            </div>
                            <div class="col col-input">
                                <input class="form-control" value="Nguyễn Minh Nhựt" type="text" disabled="disabled">
                            </div>
                        </div>
                        <div class="row form-group" style="padding-top: 10px;">
                            <div class="col col-label">
                                <label>Họ và tên:</label>
                            </div>
                            <div class="col col-input">
                                <input class="form-control" value="Nguyễn Minh Nhựt" type="text" disabled="disabled">
                            </div>
                        </div>

                        <hr>
                        <button class="btn_user">
                            Cập nhập thông tin
                        </button>

                    </div>

                    <div class="col-md-5">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Bảo mật</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Thông tin bạn luôn được đảm bảo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import user_nav from '../../components/customer/user_nav.vue';
export default
    {

        components:
        {
            user_nav
        },
    }
    
</script>
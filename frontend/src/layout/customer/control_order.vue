<template>
    <div class="container" style="padding-top: 100px;">
        <div class="row">
            <div class="col-lg-4 col-xl-auto">
                <user_nav />
            </div>

            <div class="col-lg-8 col-xl">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Mã đơn hàng</th>
                            <th scope="col">Ngày đặt</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Thông tin mẫu</td>
                            <td>Thông tin mẫu</td>
                            <td>Thông tin mẫu</td>
                            <td>Thông tin mẫu</td>
                        </tr>
                    </tbody>
                </table>
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
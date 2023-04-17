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
                                <input class="form-control" :value=user.username type="text">
                            </div>
                        </div>
                        <div class="row form-group" style="padding-top: 10px;">
                            <div class="col col-label">
                                <label>Email:</label>
                            </div>
                            <div class="col col-input">
                                <input class="form-control" :value=user.email type="text" disabled="disabled">
                            </div>
                        </div>
                        <div class="row form-group" style="padding-top: 10px;">
                            <div class="col col-label">
                                <label>Địa chỉ:</label>
                            </div>
                            <div class="col col-input">
                                <input class="form-control" :value="user.address ? user.address : ''"
                                    placeholder="Cập nhật địa chỉ" type="text" @focus="hidePlaceholder">
                            </div>
                        </div>
                        <div class="row form-group" style="padding-top: 10px;">
                            <div class="col col-label">
                                <label>Số điện thoại:</label>
                            </div>
                            <div class="col col-input">
                                <input class="form-control" :value="user.phone ? user.phone : ''"
                                    placeholder="Cập nhật số điện thoại" type="text" @focus="hidePlaceholder">
                            </div>
                        </div>
                        <hr>
                        <button class="btn_user" v-on:click="updateUserById">
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
export default {
    components: {
        user_nav
    },
    data() {
        return {
            user: {}
        };
    },
    mounted() {
        this.getUserById();
    },
    methods: {
        async getUserById() {
            const userJSON = localStorage.getItem('user')
            const user = JSON.parse(userJSON);
            const userId = user.id;
            console.log(userId);
            try {
                const response = await this.$axios.get(`getUserById/${userId}`);
                this.user = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async updateUserById() {
            const userJSON = localStorage.getItem('user')
            const user = JSON.parse(userJSON);
            const userId = user.id;
            const { username, address, phone } = this.user;
            console.log( this.user);
            try {
                const response = await this.$axios.put(`updateUserById/${userId}`, {
                    username,
                    address,
                    phone
                });

                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    },

};
</script>
<template>
    <div class="container" style="padding-top: 100px;">
        <div class="row">
            <div class="col-lg-4 col-xl-auto">
                <user_nav />
            </div>

            <div class="col-lg-8 col-xl">
                <div class="row">
                    <div class="col-md-8">
                        <h3 class="d-flex fw-bold">Thông tin cá nhân của bạn</h3>
                        <div class="row form-group" style="padding-top: 30px;">
                            <div class="col col-label">
                                <label>Họ và tên:</label>
                            </div>
                            <div class="col col-input">
                                <input class="form-control" v-model="user.username" type="text">
                            </div>
                        </div>
                        <div class="row form-group" style="padding-top: 30px;">
                            <div class="col col-label">
                                <label>Email:</label>
                            </div>
                            <div class="col col-input">
                                <input class="form-control" :value=user.email type="text" disabled="disabled">
                            </div>
                        </div>
                        <div class="row form-group" style="padding-top: 30px;">
                            <div class="col col-label">
                                <label>Địa chỉ:</label>
                            </div>
                            <div class="col col-input">
                                <textarea class="form-control" v-model="user.address" placeholder="Cập nhật địa chỉ"
                                rows="4" cols="50" @focus="hidePlaceholder"></textarea>
                            </div>
                        </div>
                        <div class="row form-group" style="padding-top: 30px;">
                            <div class="col col-label">
                                <label>Số điện thoại:</label>
                            </div>
                            <div class="col col-input">
                                <input class="form-control" v-model="user.phone" placeholder="Cập nhật số điện thoại"
                                    type="number" @focus="hidePlaceholder">
                            </div>
                        </div>
                        <hr>
                        <button class="btn_user" @click="updateUser()">
                            Cập nhập thông tin
                        </button>

                    </div>

                    <div class="col-md-4">
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
        getID() {
            const userJSON = localStorage.getItem('user'); // Lấy chuỗi JSON từ localStorage
            let userId;
            const data = JSON.parse(userJSON); // Chuyển chuỗi JSON thành đối tượng JavaScript
            if (data.id) {
                userId = data.id; // Lấy giá trị của thuộc tính "id" trong đối tượng "user"
            } else {
                userId = data.user.id; // Lấy giá trị của thuộc tính "id" trong đối tượng "user" trong chuỗi JSON
            }
            return userId;
        },
        async getUserById() {
            const userId = this.getID();
            try {
                const response = await this.$axios.get(`getUserById/${userId}`);
                this.user = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async updateUser() {
            const userId = this.getID();
            const newUsername = this.user.username; // Giá trị mới của username
            const newAddress = this.user.address; // Giá trị mới của address
            const newPhone = this.user.phone; // Giá trị mới của phone

            try {
                const response = await this.$axios.put(`updateUserById/${userId}`, {
                    username: newUsername,
                    address: newAddress,
                    phone: newPhone
                });
                if (response.status === 200) {
                    alert('Cập nhật thông tin thành công!');
                } else {
                    throw new Error('Có lỗi xảy ra khi cập nhật thông tin!');
                }
            } catch (error) {
                console.error(error);
                alert(error.message);
            }
        }
    },

};
</script>
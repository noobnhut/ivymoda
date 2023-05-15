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
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders">
                            <td>{{ order.id }}</td>
                            <td>{{ formatTime(order.createdAt) }}</td>
                            <td>{{ order.status }}</td>
                            <td>{{ formatCurrency(order.total) }}</td>
                            <th scope="col">
                                <h6 v-if="order.status === 'Đã hủy đơn'" class="cancelled-order">Đã hủy đơn</h6>
                                <a  v-else type="button" class="btn" @click="CancelOrder(order.id)">Hủy đơn</a>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import user_nav from '../../components/customer/user_nav.vue';
import moment from 'moment';
export default
    {
        data() {
            return {
                orders: [],
                id: '',
                total: '',
                id_product: '',
                quantity: '',
                status: '{{ status }}',
                products: [],
                isOrderCancelled: false
            }
        },
        components:
        {
            user_nav
        },
        mounted() {
            this.getAllOrders();
        },
        methods:
        {
            getAllOrders() {
                this.$axios.get(`orderdetail/` + this.getID())
                    .then(response => {
                        this.orders = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                        this.$refs.toast.show({ type: 'error', message: 'Lỗi khi lấy danh sách hóa đơn' });
                    });
            },
            CancelOrder(orderId) {
                // Sử dụng hộp thoại xác nhận để hỏi người dùng trước khi hủy đơn hàng
                if (confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
                    // Gửi yêu cầu cập nhật trạng thái đơn hàng đến server
                    this.$axios.put(`cancelorders/${orderId}`, { status: 'Đã hủy đơn' })
                        .then(response => {
                            this.getAllOrders();
                            console.log(response)
                            // Hiển thị thông báo hoặc cập nhật UI sau khi đơn hàng được hủy
                            this.isOrderCancelled = true; // Đã hủy
                        })
                        .catch(error => {
                            console.log(error);
                            // Xử lý lỗi nếu cần thiết
                        });
                }
            },


            formatCurrency(value) {
                let val = (value / 1).toFixed(0).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ'
            },
            formatTime(value) {
                return moment(value).format('DD/MM/YYYY HH:mm:ss');
            },
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

        }

    }

</script>

<style>
.cancelled-order {
  font-style: italic;
  opacity: 0.7;
}

</style>
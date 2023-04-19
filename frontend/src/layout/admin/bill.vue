<template>
    <div class="container">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                        <h2>Quản lý <b>hóa đơn</b></h2>
                    </div>
                </div>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>mã khách hàng:</th>
                        <th>tổng tiền hóa đơn:</th>
                        <th>Actions:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders">
                        <td>{{ order.id_user }}</td>
                        <td>{{ order.total }}.000đ</td>
                        <td>
                            <a type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModaledit"
                                @click="getOrderDetails(order.id)">xem chi tiết</a>
                            <a class="delete"><i class="fa-solid fa-trash-can"></i></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <toast ref="toast"></toast>
    <!-- Edit Modal HTML -->
    <div class="modal fade" id="exampleModaledit" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Chi tiết hóa đơn</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label><strong>Mã hóa đơn:</strong> {{ id }}</label>
                    </div>
                    <div class="form-group">
                        <label><strong>Mã sản phẩm:</strong> {{ id_product }}</label>
                    </div>
                    <div class="form-group">
                        <label><strong>Tên sản phẩm:</strong> {{ name }}</label>
                    </div>
                    <div class="form-group">
                        <label><strong>Số lượng:</strong> {{ quantity }}</label>
                    </div>
                    <div class="form-group">
                        <label><strong>Giá:</strong> {{ price }}</label>
                    </div>
                    <div class="form-group">
                        <label><strong>Trạng thái hiện tại:</strong> {{ status }} </label>
                    </div>
                    <div class="form-group">
                        <label for="status-select"><strong>chọn trạng thái mới:</strong></label>
                        <select class="form-control" id="status-select" v-model="status">
                            <option value="đã đặt" v-bind:selected="status === 'đã đặt'">Đã đặt</option>
                            <option value="đang giao" v-bind:selected="status === 'đang giao'">Đang giao</option>
                            <option value="đã giao" v-bind:selected="status === 'đã giao'">Đã giao</option>
                        </select>
                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btnorder" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary btnorder" @click="updateStatus(id, status)">Cập
                        nhập</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import toast from '../../components/toast.vue';
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
                products: []
            }
        },
        components: {
            toast
        },
        mounted() {
            this.getAllOrders();
        },
        methods: {
            getAllOrders() {
                this.$axios.get(`orders`)
                    .then(response => {
                        this.orders = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                        this.$refs.toast.show({ type: 'error', message: 'Lỗi khi lấy danh sách hóa đơn' });
                    });
            },
            getOrderDetails(orderId) {
                this.$axios.get(`orders/${orderId}`)
                    .then(response => {
                        const orderDetails = response.data;
                        this.id = orderDetails[0].id;
                        this.total = orderDetails[0].total;
                        this.products = orderDetails[0].products; // Thêm dòng này để lấy thông tin sản phẩm
                        this.id_product = orderDetails[0].products[0].id;
                        this.quantity = orderDetails[0].products[0].quantity,
                            this.price = orderDetails[0].products[0].price,
                            this.status = orderDetails[0].products[0].status,
                            this.name = orderDetails[0].products[0].name
                    })
                    .catch(error => {
                        console.log(error);
                        this.$refs.toast.show({ type: 'error', message: 'Lỗi khi lấy chi tiết hóa đơn' });
                    });
            },
            showOrderDetails(order) {
                this.id = order.id;
                this.id_user = order.id_user;
                this.id_product = order.id_product;
                this.quantity = order.quantity;
                this.price = order.price;
                this.status = order.status;
                this.name = order.name;
            },
            updateStatus(orderId, newStatus) {
                console.log(orderId, newStatus);
                const updateOrder = this.$axios.put(`orders/${orderId}`, { status: newStatus })
                    .then(response => {
                        // Cập nhật trạng thái đơn hàng trong danh sách hiện tại
                        const orderIndex = this.orders.findIndex(order => order.id === orderId);
                        if (orderIndex >= 0) {
                            this.orders[orderIndex].status = newStatus;
                        }
                        // Hiển thị thông báo thành công
                        this.$refs.toast.showToast(`trạng thái đơn đã chuyển thành : ${newStatus}`);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style>
.modal-content {
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: none;
}

.modal-body {
    padding: 20px 0;
}

.form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
}

.modal-footer {
    border-top: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btnorder {
    border-radius: 5px;
}

.btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}
</style>
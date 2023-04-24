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
                        <th>Mã khách hàng:</th>
                        <th>Tổng tiền hóa đơn:</th>
                        <th>Actions:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders">
                        <td>{{ order.id_user }}</td>
                        <td>{{   formatCurrency(order.total) }}</td>
                        <td>
                            <a type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModaledit"
                                @click="sendata(order)">Xem chi tiết</a>
                            
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

                <div class="modal-body" v-for="order in orderDetails.filter(item => item.id == this.id)">
                    <div class="form-group">
                        <label><strong>Mã hóa đơn:</strong> {{ order.id }}</label>
                    </div>
                    <div class="form-group">
                        <label><strong>Danh sách sản phẩm:</strong></label>
                        <p v-for="product in order.products">Tên: {{ product.name }} - Giá: {{  formatCurrency(product.price)}} - Số lượng: {{product.quantity}}</p>
                    </div>
                    <div class="form-group">
                        <label><strong>Trạng thái hiện tại:</strong> {{ order.status }} </label>
                    </div>
                    <div class="form-group">
                        <label for="status-select"><strong>Chọn trạng thái mới:</strong></label>
                        <select class="form-control" id="status-select" v-model="status">
                            <option value="đã đặt" v-bind:selected="status === 'Đã đặt'">Đã đặt</option>
                            <option value="đang giao" v-bind:selected="status === 'Đang giao'">Đang giao</option>
                            <option value="đã giao" v-bind:selected="status === 'Đã giao'">Đã giao</option>
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
                id_user: 0,
                total: '',
                id_product: '',
                quantity: '',
                status: '{{ status }}',
                products: [],
                orderDetails: []

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
            sendata(order) {
                this.id = order.id;
                this.id_user = order.id_user
                this.getOrderDetails();
            },
            async getOrderDetails() {
                console.log(this.id_user); // in ra giá trị của biến this.id_user để kiểm tra
                try {
                    const result = await this.$axios.get(`orderdetail/` + this.id_user);
                    this.orderDetails = result.data;
                } catch (e) {
                    this.orderDetails = []
                }
            }
            ,
            updateStatus(orderId, newStatus) {
               
                const updateOrder = this.$axios.put(`orders/${orderId}`, { status: newStatus })
                    .then(response => {
                        // Cập nhật trạng thái đơn hàng trong danh sách hiện tại
                        const orderIndex = this.orders.findIndex(order => order.id === orderId);
                        if (orderIndex >= 0) {
                            this.orders[orderIndex].status = newStatus;
                        }
                        // Hiển thị thông báo thành công
                        this.$refs.toast.showToast(`trạng thái đơn đã chuyển thành : ${newStatus}`);
                        this.status = 'Đã đặt';
                        this.getOrderDetails()
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    
            },
            formatCurrency(value) {
                let val = (value / 1).toFixed(0).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ'
            },
        }
    }
</script>


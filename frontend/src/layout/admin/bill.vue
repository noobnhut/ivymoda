<template>
    <div class="container">
        <div class="table-wrapper">
            <div class="d-flex justify-content-between">
                <div class="form-group">
                    <label for="product_id" style="padding:10px">Chọn loại hóa đơn:</label>
                    <select v-model="selectedOption" required @change="getAllOrders()">
                        <option disabled value="">Chọn loại hóa đơn:</option>
                        <option value="all">Xem tất cả đơn hàng</option>
                        <option value="đã đặt">Đơn hàng đã đặt</option>
                        <option value="đang giao">Đơn hàng đang giao</option>
                        <option value="đã giao">Đơn hàng đã giao</option>
                    </select>
                </div>
            </div>
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
                        <th>Ảnh sản phẩm</th>
                        <th>Tổng tiền hóa đơn:</th>
                        <th>trạng thái:</th>
                        <th>Actions:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order.id">
                        <td>{{ order.id_user }}</td>
                        <td>
                            <template v-if="order.order_details.length > 0">
                                <div>
                                    <template v-for="orderDetail in order.order_details">
                                        <div class="product-image"
                                            v-for="image in getProductImages(order, orderDetail.id_product)">
                                            <img :src="image.url" style="width: 100px; height: 100px; margin-right: 10px;">
                                        </div>
                                    </template>
                                </div>
                            </template>
                        </td>
                        <td>{{ formatCurrency(order.total) }}</td>
                        <td>{{ order.status }}</td>
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
                    <div class="form-group" v-for="product in order.products">
                        <label><strong>Danh sách sản phẩm:</strong></label>
                        <p>
                            Tên: {{ product.name }} - Giá: {{ formatCurrency(product.price) }} - Số lượng: {{
                                product.quantity }}
                        </p>
                        <div class="product-images">
                            <div>
                                <div class="product-image" v-for="image in product.images">
                                    <img :src="image" style="width: 100px; height: 100px;">
                                </div>
                            </div>
                        </div>
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
                status: '',
                products: [],
                orderDetails: [],
                selectedOption: '',

            }
        },
        components: {
            toast
        },
        mounted() {

            this.getAllOrders();
        },
        methods: {
            async getAllOrders() {
                await this.$axios.get(`orders`)
                    .then(response => {
                        const orders = response.data;
                        orders.forEach(order => {
                            if (order.order_details.every(orderDetail => orderDetail.status === 'Đã giao')) {
                                order.status = 'Đã giao';
                            } else if (order.order_details.some(orderDetail => orderDetail.status === 'Đang giao')) {
                                order.status = 'Đang giao';
                            } else {
                                order.status = 'Đã đặt';
                            }

                        });

                        switch (this.selectedOption) {
                            case 'đã đặt':
                                this.orders = orders.filter(order => order.status === 'Đã đặt');
                                break;
                            case 'đang giao':
                                this.orders = orders.filter(order => order.status === 'Đang giao');
                                break;
                            case 'đã giao':
                                this.orders = orders.filter(order => order.status === 'Đã giao');
                                break;
                            default:
                                this.orders = orders;
                                break;
                        }
                        console.log(orders)
                    })
                    .catch(error => {
                        console.log(error);
                        this.$refs.toast.show({ type: 'error', message: 'Lỗi khi lấy danh sách hóa đơn' });
                    });
            },
            getProductImages(order, productId) {
                const images = [];
                for (let i = 0; i < order.order_details.length; i++) {
                    const orderDetail = order.order_details[i];
                    if (orderDetail.id_product === productId) {
                        const color = orderDetail.Product.colors[0];
                        if (color && color.Imgs.length > 0) {
                            images.push(...color.Imgs);
                        }
                    }
                }

                return images;
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
                return this.$axios.put(`orders/${orderId}`, { status: newStatus })
                    .then(response => {
                        const order = this.orders.find(order => order.id === orderId);
                        if (order) {
                            order.status = newStatus;
                        }

                        // Cập nhật trạng thái cho hóa đơn cụ thể
                        order.status = newStatus;

                        this.$refs.toast.showToast(`Trạng thái đơn đã chuyển thành: ${newStatus}`);
                        this.getOrderDetails();
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
<style>
.product-image {
    float: right;
    margin-left: 10px;
}

.form-group:after {
    content: "";
    display: table;
    clear: both;
}
</style>
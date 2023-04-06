<template>
    <div class="container">

        <div class="d-flex justify-content-between">
            <div class="form-group">
                <label for="product_id" style="padding:10px">Sản phẩm:</label>
                <select id="product_id" v-model="product_id" required>
                    <option disabled>Chọn loại đối tượng:</option>
                    <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}
                    </option>
                </select>
                <br>
            </div>
            <a type="button" class="btn btn-primary" @click="getdetail()">
                <span>Lấy danh sách chi tiết</span></a>
        </div>

        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                        <h2>Quản lý <b>Chi tiết sản phẩm</b></h2>
                    </div>
                    <div class="col-sm-6">

                        <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                                class="fa-solid fa-circle-plus"></i> <span>Thêm chi tiết sản phẩm</span></a>
                    </div>
                </div>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Màu sắc:</th>
                        <th>Mã màu:</th>
                        <th>Size:</th>
                        <th>Số lượng:</th>
                        <th>Ảnh:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="detail in details">
                        <td>{{ detail.color }}</td>
                        <td>{{ detail.color_code }}</td>
                        <td>{{ detail.size }}</td>
                        <td>{{ detail.quantity }}</td>
                        <td><img :src=detail.url alt="" style="width:80px"></td>
                        <td>
                            <a type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModaledit"><i
                                    class="fa-solid fa-spinner" @click="sendata(detail)"></i></a>
                            <a class="delete" @click="deleteDetail(detail.id)"><i class="fa-solid fa-trash-can"></i></a>
                        </td>
                    </tr>
                </tbody>
            </table>


        </div>

    </div>
    <toast ref="toast"></toast>

    <!-- Add Modal HTML -->

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="adddetail">
                        <div class="form-group">
                            <label>Màu sắc:</label>
                            <input type="text" class="form-control" v-model="color">
                        </div>
                        <div class="form-group">
                            <label>Mã màu:</label>
                            <input type="color" class="form-control" v-model="color_code" @input="updateColor">
                        </div>
                        <br>
                        <div class="form-group">
                            <label>Size:</label>
                            <select v-model="size_id" required>
                                <option disabled>Chọn size:</option>
                                <option v-for="size in sizes" :key="size.id" :value="size.id">{{ size.value }}</option>
                            </select>

                        </div>
                        <br>
                        <div class="form-group">
                            <label>Số lượng:</label>
                            <input type="text" class="form-control" v-model="quantity">
                        </div>
                        <div class="form-group">
                            <label for="image">Hình ảnh:</label>
                            <input class="form-control" type="file" id="image" @change="onFileSelected">
                            <br>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="submit" class="btn btn-primary">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="exampleModaledit" tabindex="-1" aria-hidden="true" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="updatedetail">
                        <div class="form-group">
                            <label>Màu sắc:</label>
                            <input type="text" class="form-control" v-model="color">
                        </div>
                        <div class="form-group">
                            <label>Mã màu:</label>
                            <input type="color" class="form-control" v-model="color_code" @input="updateColor">
                        </div>
                        <br>
                        <div class="form-group">
                            <label>Size:</label>
                            <select v-model="size_id" required>
                                <option disabled>Chọn size:</option>
                                <option v-for="size in sizes" :key="size.id" :value="size.id">{{ size.value }}</option>
                            </select>

                        </div>
                        <br>
                        <div class="form-group">
                            <label>Số lượng:</label>
                            <input type="text" class="form-control" v-model="quantity">
                        </div>
                        <div class="form-group">
                            <label for="image">Hình ảnh:</label>
                            <input class="form-control" type="file" id="image" @change="onFileSelected">
                            <br>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="submit" class="btn btn-primary">Cập nhập</button>
                        </div>
                    </form>
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
                details: [],
                sizes: [
                    { id: '0', value: 'S' },
                    { id: '1', value: 'M' },
                    { id: '2', value: 'L' },
                    { id: '3', value: 'XL' },
                    { id: '4', value: 'XXL' },
                    { id: '5', value: '3XL' },
                    { id: '6', value: '4XL' },
                ],
                color: '',
                color_code: "#000000",
                size: '',
                quantity: '',
                avatar: '',
                size_id: '',
                product_id: null,
                products: [],
                id:''
            }
        },

        mounted() {
            this.getproduct();
        },
        components: {
            toast
        },

        methods: {
            onFileSelected(event) {
                this.avatar = event.target.files[0]
            },
            updateColor(event) {
                this.color_code = event.target.value;
            },
            async getdetail() {
                try {
                    const result = await this.$axios.get(
                        `getDetail/` + this.product_id
                    );
                    this.details = result.data;

                } catch (e) {
                    
                    this.details=[]
                }


            },
            async getproduct() {
                try {
                    const result = await this.$axios.get(
                        `getProduct`
                    );
                    this.products = result.data;
                    console.log(result);
                } catch (e) {
                    console.log(e);
                }
            },
            sendata(detail) {
                this.color = detail.color;
                this.color_code = detail.color_code;
                this.quantity = detail.quantity;
                this.id=detail.id
                this.size_id = this.sizes.findIndex(size => size.value === detail.size);
                
            },
            async adddetail() {
                // ...
                this.size = this.sizes.find(size => size.id === this.size_id).value;
                const formData = new FormData();
                formData.append('id_product', this.product_id);
                formData.append('avatar', this.avatar);
                formData.append('color', this.color);
                formData.append('color_code', this.color_code);
                formData.append('size', this.size);
                formData.append('quantity', this.quantity);
                try {
                    const response = await this.$axios.post('addDetail', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    this.$refs.toast.showToast(response.data.message);
                } catch (error) {
                    console.error(error);
                }
            },
            async deleteDetail(id) {
                const detaildelete = await this.$axios.delete(
                    `deleteDetail/` + id,
                )
                if (detaildelete.status == 200) {
                    this.$refs.toast.showToast(detaildelete.data.message)
                    location.reload()
                }
                else {
                    this.$refs.toast.showToast(detaildelete.data.message)
                    location.reload()
                }
            },
            async updatedetail()
            {
                this.size = this.sizes.find(size => size.id === this.size_id).value;
                const formData = new FormData();
                formData.append('id_product', this.product_id);
                formData.append('avatar', this.avatar);
                formData.append('color', this.color);
                formData.append('color_code', this.color_code);
                formData.append('size', this.size);
                formData.append('quantity', this.quantity);
                try {
                    const response = await this.$axios.put('updateDetail/' + this.id, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    // ...
                } catch (error) {
                    console.error(error);
                }
            }


        },
    }
</script>
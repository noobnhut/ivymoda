<template>
    <div class="container">

        <div class="d-flex justify-content-between">
            <div class="form-group">
                <label for="product_id" style="padding:10px">Sản phẩm:</label>
             
                <select id="product_id" v-model="product_id" required @change="getcolor">
                    <option disabled>Chọn loại đối tượng:</option>
                    <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}
                    </option>
                </select>
                <br>
            </div>
           
        </div>

        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                        <h2>Quản lý <b>màu sản phẩm</b></h2>
                    </div>
                    <div class="col-sm-6">

                        <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                                class="fa-solid fa-circle-plus"></i> <span>Thêm màu sản phẩm</span></a>
                    </div>
                </div>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Màu sắc:</th>
                        <th>Mã màu:</th>
                        <th>Ý nghĩa màu sắc:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="color in colors">
                        <td>{{ color.color }}</td>
                        <td :style="{ backgroundColor: color.color_code }"> {{ color.color_code }}</td>
                        <td>{{ color.detail_product }}</td>
                        <td>
                            <a type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModaledit"><i
                                    class="fa-solid fa-spinner" @click="sendata(color)"></i></a>
                            <a class="delete" @click="deletecolor(color.id)"><i class="fa-solid fa-trash-can"></i></a>
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm màu sản phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="addcolor">
                        <div class="form-group">
                            <label>Màu sắc:</label>
                            <input type="text" class="form-control" v-model="color">
                        </div>
                        <div class="form-group">
                            <label>Mã màu:</label>
                            <input type="color" class="form-control" v-model="color_code" @input="updateColor">
                        </div>
                        <div class="form-group">
                            <label>Ý nghĩa màu</label>
                            <input type="text" class="form-control" v-model="detail_product">
                        </div>
                        <br>

                        <br>

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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhập màu</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="updatecolor">
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
                            <label>Ý nghĩa màu:</label>
                            <input type="text" class="form-control" v-model="detail_product">
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="submit" class="btn btn-primary" >Cập nhập</button>
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
                colors: [],
                color: '',
                color_code: "#000000",
                detail_product: '',
                size_id: '',
                product_id: null,
                products: [],
                id: '',

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
            async getcolor() {

                try {
                    const result = await this.$axios.get(
                        `getColor/` + this.product_id
                    );
                    this.colors = result.data;

                } catch (e) {

                    this.colors = []
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
            sendata(color) {
                this.color = color.color;
                this.color_code = color.color_code;
                this.id = color.id;
                this.detail_product=color.detail_product;
            },
            async addcolor() {
                try {
                    const response = await this.$axios.post('addColor', {
                        id_product: this.product_id,
                        color: this.color,
                        color_code: this.color_code,
                        detail_product: this.detail_product
                    });
                    this.$refs.toast.showToast(response.data.message)
                } catch (error) {
                    console.error(error);
                }
                this.product_id = this.product_id
                this.color= ''
                this.color_code=  "#000000"
                this.detail_product=''
                this.getcolor()
            },
            async deletecolor(id) {
                const colordelete = await this.$axios.delete(
                    `deleteColor/` + id,
                )
                if (colordelete.status == 200) {
                    this.$refs.toast.showToast(colordelete.data.message)
                    this.getcolor()

                }
                else {
                    this.$refs.toast.showToast(colordelete.data.message)
                    this.getcolor()

                }
            },
            async updatecolor() {
                try {
                    const response = await this.$axios.put('updateColor/' + this.id, {
                        id_product: this.product_id,
                        color: this.color,
                        color_code: this.color_code,
                        detail_product:this.detail_product
                    });
                    this.$refs.toast.showToast(response.data.message)
                } catch (error) {
                    console.error(error);
                }
                this.getcolor()
            }
        },
    }
</script>
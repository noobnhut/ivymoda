<template>
    <div class="container">

        <div class="d-flex justify-content-between">
            <div class="form-group">
                <label for="product_id" style="padding:10px" >Sản phẩm:</label>
                <select id="product_id" v-model="product_id" required @change="getcolor()">
                    <option disabled>Chọn loại đối tượng:</option>
                    <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}
                    </option>
                </select>
                <br>
            </div>
           
        </div>

        <br>
        <div class="d-flex justify-content-between">
            <div class="form-group">
                <label for="color_id" style="padding:10px">Màu sắc:</label>
                <select id="color_id" v-model="color_id" required @change="getsize()">
                    <option disabled>Chọn loại màu:</option>
                    <option v-for="color in colors" :key="color.id" :value="color.id">{{ color.color }}
                    </option>
                </select>
                <br>
            </div>
  
        </div>

        <br>
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                        <h2>Quản lý <b>Size sản phẩm</b></h2>
                    </div>
                    <div class="col-sm-6">

                        <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                                class="fa-solid fa-circle-plus"></i> <span>Thêm size sản phẩm</span></a>
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
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="size in sizes">
                        <td>{{ size.color.color }}</td>
                        <td>{{ size.color.color_code }}</td>
                        <td>{{ size.size }}</td>
                        <td>{{ size.quantity }}</td>
                        <td>
                            <a type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModaledit"><i
                                    class="fa-solid fa-spinner" @click="sendata(size)"></i></a>
                            <a class="delete" @click="deletesize(size.id)"><i class="fa-solid fa-trash-can"></i></a>
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
                    <form @submit.prevent="addsize">
                        <br>
                        <div class="form-group">
                            <label>Size:</label>
                             <select v-model="sizeA_id" required>
                                <option disabled>Chọn size:</option>
                                <option v-for="sizeA in sizesA" :key="sizeA.id" :value="sizeA.id">{{ sizeA.value }}</option>
                            </select>
                            <br>
                        </div>
                        <div class="form-group">
                            <label>quantity:</label>
                            <input class="form-control" type="text" v-model="quantity">
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
                    <form @submit.prevent="updatesize">
                        <div class="form-group">
                            <label>Size:</label>
                            <select v-model="sizeA_id" required>
                                <option disabled>Chọn size:</option>
                                <option v-for="sizeA in sizesA" :key="sizeA.id" :value="sizeA.id">{{ sizeA.value }}</option>
                            </select>
                            <br>
                        </div>
                        <div class="form-group">
                            <label>quantity:</label>
                            <input class="form-control" type="text" v-model="quantity">
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
                sizes: [],
                sizesA: [
                    { id: '0', value: 'S' },
                    { id: '1', value: 'M' },
                    { id: '2', value: 'L' },
                    { id: '3', value: 'XL' },
                    { id: '4', value: 'XXL' },
                    { id: '5', value: '3XL' },
                    { id: '6', value: '4XL' },
                ],
                size: '',
                sizeA_id:'',
                quantity: "",
                colors: [],
                color_id: null,
                product_id: null,
                products: [],
            }
        },

        mounted() {
            this.getproduct();
        },
        components: {
            toast
        },
        methods: {

            async getcolor() {
                try {
                    const result = await this.$axios.get(
                        `getcolor/` + this.product_id
                    );
                    this.colors = result.data;

                } catch (e) {

                    this.sizes = []
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

            async getsize() {
                try {
                    const result = await this.$axios.get(
                        `getSize/` + this.color_id
                    );
                    this.sizes = result.data;

                } catch (e) {

                    this.sizes = []
                }


            },

            sendata(size) {
                this.id = size.id;
                this.sizeA_id = this.sizesA.findIndex(sizeA => sizeA.value === size.size);
                this.quantity = size.quantity;
            },

            async addsize() {
                this.size = this.sizesA.find(size => size.id === this.sizeA_id).value;
                try {
                    const response = await this.$axios.post('addsize',
                        {
                            id_color: this.color_id,
                            size: this.size,
                            quantity: this.quantity
                        });
                    this.$refs.toast.showToast(response.data.message);
                    this.getsize()
                } catch (error) {
                    console.error(error);
                }
            },

            async deletesize(id) {
                const detaildelete = await this.$axios.delete(
                    `deleteSize/` + id,
                )
                    this.$refs.toast.showToast(detaildelete.data.message)
                    this.getsize()
               
            },

            async updatesize() {
                this.size = this.sizesA.find(size => size.id === this.sizeA_id).value;
                try {
                    const response = await this.$axios.put('updateSize/' + this.id, {
                        id_color: this.color_id,
                        size: this.size,
                        quantity: this.quantity
                    });
                    this.$refs.toast.showToast(response.data.message)
                    this.getsize()
                } catch (error) {
                    console.error(error);
                }
            }
        },
    }
</script>
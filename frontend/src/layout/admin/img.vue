<template>
    <div class="container">

        <div class="d-flex justify-content-between">
            <div class="form-group">
                <label for="product_id" style="padding:10px">Sản phẩm:</label>
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
                <select id="color_id" v-model="color_id" required @change="getimg()">
                    <option disabled>Chọn loại màu:</option>
                    <option v-for="color in colors" :key="color.id" :value="color.id">{{ color.color  }}
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
                        <h2>Quản lý <b>Hình ảnh sản phẩm</b></h2>
                    </div>
                    <div class="col-sm-6">

                        <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                                class="fa-solid fa-circle-plus"></i> <span>Thêm hình ảnh sản phẩm</span></a>
                    </div>
                </div>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Màu sắc:</th>
                        <th>Mã màu:</th>
                        <th>Tên ảnh:</th>
                        <th>Ảnh:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="img in imgs">
                        <td>{{ img.color.color }}</td>
                        <td>{{ img.color.color_code }}</td>
                        <td>{{ img.avatar}}</td>
                        <td><img :src=img.url alt="" style="width:80px"></td>
                        <td>
                            <a type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModaledit"><i
                                    class="fa-solid fa-spinner" @click="sendata(img)"></i></a>
                            <a class="delete" @click="deleteimg(img.id)"><i class="fa-solid fa-trash-can"></i></a>
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
                    <form @submit.prevent="addimg">
                        <br>
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
                    <form @submit.prevent="updateimg">
                        <div class="form-group">
                            <label for="image">Hình ảnh cũ:</label>
                            <br>
                            <img v-bind:src="url" alt="" style="width:300px">
                            <br>
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
                imgs: [],
                color: '',
                color_code: "",
                avatar: '',
                url:'',
                colors: [],
                color_id:null,
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
            onFileSelected(event) {
                this.avatar = event.target.files[0]
            },
            updateColor(event) {
                this.color_code = event.target.value;
            },
            async getimg() {
                try {
                    const result = await this.$axios.get(
                        `getImg/` + this.color_id
                    );
                    this.imgs = result.data;

                } catch (e) {
                    
                    this.imgs=[]
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
            async getcolor() {
                try {
                    const result = await this.$axios.get(
                        `getColor/` + this.product_id
                    );
                    this.colors = result.data;

                } catch (e) {
                    
                    this.colors=[]
                }


            },
            sendata(img) {
                this.id=img.id;      
                this.url=img.url;  
                console.log(img.id)     
            },
            async addimg() {
               
                const formData = new FormData();
                formData.append('avatar', this.avatar);
                formData.append('id_color',this.color_id);
                try {
                    const response = await this.$axios.post('addImg', formData, {
                       
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    this.$refs.toast.showToast(response.data.message);
                    this.getimg()
                } catch (error) {
                    console.error(error);
                }
            },
            async deleteimg(id) {
                const detaildelete = await this.$axios.delete(
                    `deleteImg/` + id,
                )
               
                    this.$refs.toast.showToast(detaildelete.data.message)
                    this.getimg()
                    
               
            },
            async updateimg()
            {
                const formData = new FormData();
                formData.append('id_color', this.color_id);
                formData.append('avatar', this.avatar);
                try {
                    const response = await this.$axios.put('updateImg/' + this.id, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    this.$refs.toast.showToast( response.data.message)
                    this.getimg()
                } catch (error) {
                    console.error(error);
                }
            }
        },
    }
</script>
<template>
  <div class="container" style="padding: 50px;">
    <div class="table-wrapper">
      <div class="table-title">
        <div class="row">
          <div class="col-sm-6">
            <h2>Quản lý <b>SẢN PHẨM</b></h2>
          </div>
          <div class="col-sm-6">
            <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="setDefault"><i
                class="fa-solid fa-circle-plus"></i> <span>Thêm sản phẩm</span></a>
          </div>
        </div>
      </div>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Tên sản phẩm:</th>
            <th>Giá sản phẩm:</th>
            <th>Thông tin sản phẩm:</th>
            <th>Discount:</th>
            <th>Danh mục:</th>
            <th>Đối tượng:</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products">
            <td>{{ product.name }}</td>
            <td>{{ formatCurrency( product.price) }}</td>
            <td>{{ product.information }}</td>
            <td>{{ product.discount }}%</td>
            <td>{{ product.cat_name }}</td>
            <td>{{ product.sexes_value }}</td>
            <td>
              <a type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModaledit"><i
                  class="fa-solid fa-spinner" @click="sendata(product)"></i></a>
              <a class="delete" @click="deleteProduct(product.id)"><i class="fa-solid fa-trash-can"></i></a>
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
          <div class="form-group">
            <label>Tên sản phẩm:</label>
            <input type="text" class="form-control" v-model="name">
          </div>
          <div class="form-group">
            <label>Giá sản phẩm:</label>
            <input type="text" class="form-control" v-model="price">
          </div>
          <div class="form-group">
            <label>Thông tin sản phẩm:</label>
            <input type="text" class="form-control" v-model="information">
          </div>
          <div class="form-group">
            <label>Discount:</label>
            <input type="text" class="form-control" v-model="discount">
          </div>
          <div class="form-group">
            <label for="cat_id">Danh mục đối tượng:</label>
            <br>
            <select id="cat_id" v-model="id_catsex" required>
              <option disabled>Chọn loại danh mục đối tượng</option>
              <option v-for="catsex in catsexs" :key="catsex.id" :value="catsex.id">{{ catsex.cat_name + "-" + catsex.Sexes_value }}
              </option>
            </select>
            <br>
          </div>
          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="addcatsex()">Thêm</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Modal HTML -->
  <div class="modal fade" id="exampleModaledit" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Tên sản phẩm:</label>
            <input type="text" class="form-control" v-model="name">
          </div>
          <div class="form-group">
            <label>Giá sản phẩm:</label>
            <input type="text" class="form-control" v-model="price">
          </div>
          <div class="form-group">
            <label>Thông tin sản phẩm:</label>
            <input type="text" class="form-control" v-model="information">
          </div>
          <div class="form-group">
            <label>Discount:</label>
            <input type="text" class="form-control" v-model="discount">
          </div>
          <div class="form-group">
            <label for="cat_id">Danh mục đối tượng:</label>
            <br>
            <select id="cat_id" v-model="id_catsex" required>
              <option disabled>Chọn loại danh mục đối tượng</option>
              <option v-for="catsex in catsexs" :key="catsex.id" :value="catsex.id">{{ catsex.cat_name + "-" + catsex.Sexes_value }}
              </option>
            </select>
            <br>
          </div>
          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="updateProduct">Cập nhập</button>
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
        catsexs: [],
        products:[],
        id_catsex: '',
        name:'',
        price:'',
        information:'',
        discount:'',
        id_product:''

      }
    },
    mounted() {
      this.getcatsex();
      this.getproduct();

     
    },
    components: {
      toast
    },
    methods: {
      //get du lieu 3 bang
      async getcatsex() {
        try {
          const result = await this.$axios.get(
            `getCatSex`
          );
          this.catsexs = result.data;
          console.log(result);

        } catch (e) {
          console.log(e);
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
      
      sendata(product) {
       this.name=product.name;
       this.information=product.information;
       this.price=parseInt(product.price);
       this.discount=product.discount;
       this.id_product=product.id;
       this.id_catsex=product.id_catsex;
      },

      setDefault()
      {
        this.name='';
       this.information='';
       this.price='';
       this.discount='';
       this.id_product='';
       this.id_catsex='';
      },
      formatCurrency(value) {
      let val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ'
    },
      async addcatsex() {
        const productadd = await this.$axios.post(
          'addProduct',
          {
            id_catsex: this.id_catsex,
            name:this.name,
            price:this.price,
            information:this.information,
            discount:this.discount 
          } 
        )
        this.$refs.toast.showToast(productadd.data.message)
        this.getproduct()
       
      },
      async updateProduct()
      {
        const productupdate = await this.$axios.put(
          'updateProduct/'+ this.id_product,
          {
            id_catsex: this.id_catsex,
            name:this.name,
            price:this.price,
            information:this.information,
            discount:this.discount
          } 
        )
        this.$refs.toast.showToast(productupdate.data.message)
        this.getproduct()

      },
      async deleteProduct(id)
      {
        const productdelete = await this.$axios.delete(
          `deleteProduct/` + id,
        )
        this.$refs.toast.showToast(productdelete.data.message)
        this.getproduct()      
      }
    },
  }
</script>
<template>
  <div class="container">
    <div class="table-wrapper">
      <div class="table-title">
        <div class="row">
          <div class="col-sm-6">
            <h2>Quản lý <b>DANH MỤC ĐỐI TƯỢNG</b></h2>
          </div>
          <div class="col-sm-6">
            <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="setDefault"><i
                class="fa-solid fa-circle-plus"></i> <span>Thêm danh mục đối tượng</span></a>
          </div>
        </div>
      </div>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Tên danh mục:</th>
            <th>Tên đối tượng:</th>
            <th>Actions:</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="catsex in catsexs">
            <td>{{ catsex.cat_name }}</td>
            <td>{{ catsex.Sexes_value }}</td>
            <td>
              <a type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModaledit"><i
                  class="fa-solid fa-spinner" @click="sendata(catsex)"></i></a>
              <a class="delete" @click="deleteCatSex(catsex.id)"><i class="fa-solid fa-trash-can"></i></a>
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
            <label for="cat_id">Danh mục:</label>
            <select id="cat_id" v-model="cat_id" required>
              <option disabled>Chọn loại danh mục</option>
              <option v-for="cat in cats" :key="cat.id" :value="cat.id">{{ cat.cat_name }}
              </option>
            </select>
            <br>
          </div>
          <div class="form-group">
            <label for="sex_id">Đối tượng:</label>
            <select id="sex_id" v-model="sex_id" required>
              <option disabled>Chọn loại đối tượng:</option>
              <option v-for="sex in sexs" :key="sex.id" :value="sex.id">{{ sex.Sexes_value }}
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
            <label for="cat_id">Danh mục:</label>
            <select id="cat_id" v-model="cat_id" required>
              <option disabled>Chọn loại danh mục</option>
              <option v-for="cat in cats" :key="cat.id" :value="cat.id">{{ cat.cat_name }}
              </option>
            </select>
            <br>
          </div>

          <div class="form-group">
            <label for="sex_id">Đối tượng:</label>
            <select id="sex_id" v-model="sex_id"  required>
              <option disabled>Chọn loại đối tượng:</option>
              <option v-for="sex in sexs" :key="sex.id" :value="sex.id">{{sex.Sexes_value}}</option>
            </select>
            <br>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="updatecatsex">Cập nhập</button>
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
        cats: [],
        sexs: [],
        sex_id: '',
        cat_id: '',
        catsex_id: '',
      
      }
    },
    mounted() {
      this.getcatsex();
      this.getcat();
      this.getsex();
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
      async getcat() {
        try {
          const result = await this.$axios.get(
            `getcat`
          );
          this.cats = result.data;
          console.log(result);

        } catch (e) {
          console.log(e);
        }
      },
      async getsex() {
        try {
          const result = await this.$axios.get(
            `getsex`
          );
          this.sexs = result.data;
          console.log(result);

        } catch (e) {
          console.log(e);
        }
      },
      sendata(catsex) {
        this.catsex_id = catsex.id;
        this.cat_id=catsex.id_cat;
        this.sex_id=catsex.id_sex;
      },
      setDefault()
      {
        this.cat_id='';
        this.sex_id='';
      },
      // crud
      async addcatsex() {
        const catsexadd = await this.$axios.post(
          'addCatSex',
          {
            id_cat: this.cat_id,
            id_sex: this.sex_id
          }
        )
        this.$refs.toast.showToast(catsexadd.data.message)
        this.getcatsex()
      },
      async updatecatsex() {
        const catsexupdate = await this.$axios.put(
          `updateCatSex/` + this.catsex_id,
          {
            id_cat: this.cat_id,
            id_sex: this.sex_id
          }
        )
        this.$refs.toast.showToast(catsexupdate.data.message)
        this.getcatsex()

      },
      async deleteCatSex(id) {
        const catsexdelete = await this.$axios.delete(
          `deleteCatSex/` + id,
        )
        this.$refs.toast.showToast(catsexdelete.data.message)
        this.getcatsex()

      },



    },
  }
</script>
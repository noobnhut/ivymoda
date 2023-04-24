<template>
  <div class="container">
    <div class="d-flex justify-content-between">
      <div class="form-group">
        <label for="product_id" style="padding:10px">Loại tài khoản:</label>
        <select v-model="selectedOption" required @change="getAllUser()">
          <option disabled value="">Chọn loại đối tượng:</option>
          <option value="google">Tài khoản Google</option>
          <option value="rỗng">Tài khoản IVYMODA</option>
        </select>
      </div>
      
    </div>
    <div class="table-wrapper">
      <div class="table-title">
        <div class="row">
          <div class="col-sm-6">
            <h2>Quản lý <b>khách hàng</b></h2>
          </div>
        </div>
      </div>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Họ và tên:</th>
            <th>Email:</th>
            <th>Địa chỉ:</th>
            <th>Số điện thoại:</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.address }}</td>
            <td>0{{ user.phone }}</td>
            <td v-if="user.provider !== 'google'" style="display: table-cell;">
              <a type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModaledit"><i
                  class="fa-solid fa-spinner" @click="select(user)"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <toast ref="toast"></toast>
  <!-- Edit Modal HTML -->
  <div class="modal fade" id="exampleModaledit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Sửa thông tin khách hàng</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Họ và tên:</label>
            <input type="text" class="form-control" v-model="username">
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" class="form-control" v-model="email">
          </div>
          <div class="form-group">
            <label>Địa chỉ:</label>
            <textarea class="form-control" v-model="address"></textarea>
          </div>
          <div class="form-group">
            <label>Số điện thoại:</label>
            <input type="text" class="form-control" v-model="phone">
          </div>
          <div class="form-group">
            <label>Mật khẩu mới:</label>
            <input type="text" class="form-control" v-model="password">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="updateUser">Sửa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toast from '../../components/toast.vue';
import bcrypt from 'bcryptjs';
export default {
  data() {
    return {
      users: [],
      username: '',
      email: '',
      address: '',
      phone: '',
      password : '',
      selectedOption: '',
    }
  },
  components: {
    toast
  },
  methods: {
    select(user) {
      this.username = user.username,
        this.email = user.email,
        this.address = user.address,
        this.phone = '0'+ user.phone,
      this.id = user.id
    },
    async getAllUser() {
      try {
        const response = await this.$axios.get(`getall`);
        this.users = response.data.filter(user => user.provider === this.selectedOption);
      } catch (error) {
        console.log(error);
      }
    },
    async getUserById(userId) {
      try {
        const response = await this.$axios.get(`getUserById/${userId}`);
        this.editUserData = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser() {
      if (!this.validateForm()) {
                    return;
                }

      const userID = this.id;
      console.log(userID)
      const catupdate = await this.$axios.put(
        `updateUserById/` + this.id,
        {
          username: this.username,
          email: this.email,
          address: this.address,
          phone: this.phone,
          password:this.password
        }
      )
      this.$refs.toast.showToast(catupdate.data.message)

    },
    created() {
      this.getUserById(this.$route.params.id);
    },
    validateForm() {
                // Check if all the required fields are not empty
                if (!this.email || !this.password || !this.username || !this.phone || !this.address) {
                     this.$refs.toast.showToast('Không được để trống thông tin khách hàng');
                    return false;
                }

                // Validate email format using regular expression
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.email)) {
                     this.$refs.toast.showToast('Email nhập vào không đúng chuẩn.');
                    return false;
                }

                const TestPasss = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(this.password);
                if (!TestPasss) {
                     this.$refs.toast.showToast('Mật khẩu phải trên 8 ký tự và có kí tự đặc biệt và chữ cái in hoa.');
                    return false;
                }

                // Validate phone number format
                const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
                if (!phoneRegex.test(this.phone)) {
                     this.$refs.toast.showToast('Số điện thoại phải đủ 10 số.');
                    return false;
                }

                return true;
            },
  }

}
</script>

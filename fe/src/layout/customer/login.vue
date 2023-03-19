<template>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" md="8">
          <v-sheet width="500" class="mx-auto">
            <v-card-title style="padding-bottom: 30px;">Đăng ký tài khoản</v-card-title>
            <v-form @submit.prevent="submitForm">
              <v-text-field ref="name" v-model="name" :rules="[
                () => !!name || 'Không được để trống ',
                () => !!name && name.length >= 3 || 'Tên phải lớn hơn 3 ký tự',
                nameCheck
              ]" label="Họ và tên:" placeholder="Nhập họ và tên vào nào !!!" counter="3"></v-text-field>
  
              <v-text-field v-model="email" :rules="emailRules" label="Email:"></v-text-field>
  
              <v-text-field ref="password" v-model="password" :rules="passwordRules" label="Mật khẩu"
                placeholder="Nhập mật khẩu vào nào !!!" counter="8" type="password"></v-text-field>
  
              <v-text-field ref="confirmPassword" v-model="confirmPassword" :rules="confirmPasswordRules"
                label="Xác nhận mật khẩu" placeholder="Nhập lại mật khẩu vào nào !!!" counter="8"
                type="password"></v-text-field>
  
              <v-text-field ref="address" v-model="address" :rules="[
                () => !!address || 'Không được để trống ',
                () => !!address && address.length <= 30 || 'Địa chỉ phải nhỏ hơn 30 ký tự',
                addressCheck
              ]" label="Địa chỉ" placeholder="Nhập địa chỉ vào nào !!!" counter="30"></v-text-field>
  
              <v-text-field ref="numberPhone" v-model="numberPhone" :rules="numberPhoneRules" label="Số điện thoại"
                placeholder="Nhập số điện thoại vào nào !!!" type="tel"></v-text-field>
  
              <v-btn type="submit" block class="mt-2">Đăng ký</v-btn>
            </v-form>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  
  <style>
  .v-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  <script>
  
  export default
    {
      data() {
        return {
          name: '',
          email: '',
          password: '',
          address: '',
          confirmPassword:'',
          numberPhone:'',
        };
      },
      computed: {
        emailRules() {
          return [
            () => !!this.email || 'Email không được để trống',
            () => /.+@.+\..+/.test(this.email) || 'Email không hợp lệ',
          ];
        },
        passwordRules() {
          return [
            () => !!this.password || 'Không được để trống',
            () => !!this.password && this.password.length >= 8 || 'Mật khẩu phải lớn hơn 8 ký tự',
            this.passwordCheck,
          ];
        },
        confirmPasswordRules() {
          return [
            () => !!this.confirmPassword || 'Không được để trống',
            () => this.confirmPassword === this.password || 'Xác nhận mật khẩu không trùng khớp',
          ];
        },
        numberPhoneRules() {
          return [
            () => !!this.numberPhone || 'Không được để trống',
            () => /^[0-9]{10}$/.test(this.numberPhone) || 'Số điện thoại phải có 10 chữ số',
          ];
        },
      },
      methods: {
        passwordCheck() {
          if (!!this.confirmPassword && this.password !== this.confirmPassword) {
            return 'Mật khẩu không trùng khớp';
          }
          return true;
        },
        submitForm() {
          if (this.$refs.form.validate()) {
            // Gửi yêu cầu đăng ký
          }
        },
      },
    }
  </script>
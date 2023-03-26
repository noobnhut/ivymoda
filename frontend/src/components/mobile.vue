<template>
    <div class="mobile">
        <div class="mobile_close">
            <button class="btn_close" @click="onclose"><i class="fa-solid fa-x"></i></button>
        </div>
        <div class="navbar-nav ms-auto p-4">

            <router-link :to="{ name: 'home' }" class="nav-item nav-link ">Trang chủ</router-link>
            <router-link :to="{ name: 'about' }" class="nav-item nav-link ">Về chúng tôi</router-link>

            <div class="nav-item dropdown">
                <a class="nav-link show" data-bs-toggle="dropdown" aria-expanded="true">Nữ</a>
                <div class="dropdown-menu bg-light m-0 show" data-bs-popper="none" style="width:100%">
                    <a class="dropdown-item">Áo</a>
                    <a class="dropdown-item">Quần</a>
                </div>
            </div>
            <div class="see_cart">
                <a @click="handleButton">{{ buttonLabel }}</a>
            </div>

        </div>
      
    </div>

</template>

<script>

export default
    {
        data() {
            return {
                buttonLabel: 'Đăng nhập'
            }
        },
        computed: {
            buttonLabel() {
                let user = localStorage.getItem("user");
                if (user) {
                    this.buttonLabel = 'Đăng xuất'

                } else {
                    this.buttonLabel = 'Đăng nhập';
                }
                return this.buttonLabel
            },
        },
        methods:
        {
            onclose() {
                this.$emit('cancelmobile')
            },
            handleButton() {
                if (this.buttonLabel == 'Đăng nhập') {
                    this.$router.push({ name: 'login' })
                }
                else if ((this.buttonLabel == 'Đăng xuất')) {
                    localStorage.removeItem('user')
                    localStorage.removeItem('token')

                    this.$router.push({ name: 'login' })
                }
            },
        }
    }
</script>
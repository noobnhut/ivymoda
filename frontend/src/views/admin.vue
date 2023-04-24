<template>
    <nav v-bind:class="(toggle) ? '' : 'open'">
        <div class="logo">
            <i class="bx bx-menu menu-icon" @click='toggle = !toggle'></i>
            <span class="logo-name">IVYMODA</span>
        </div>
        <div class="sidebar">
            <div class="logo" @click="ontoggleModel">

                <i class="bx bx-menu menu-icon"></i>
                <span class="logo-name">IVYMODA</span>

            </div>

            <div class="sidebar-content">
                <ul class="lists">
                    <li class="list">
                        <router-link  to="/admin/user" class="nav-link" @click='toggle = !toggle'>
                            <i class="bx bx-bar-chart-alt-2 icon"></i>
                            <span class="link">QL người dùng</span>
                        </router-link>
                    </li>

                    <li class="list">
                        <router-link  to="/admin/category" class="nav-link" @click='toggle = !toggle'>
                            <i class="bx bx-bar-chart-alt-2 icon"></i>
                            <span class="link">QL danh mục</span>
                        </router-link>
                    </li>

                    <li class="list">
                        <router-link  to="/admin/sexes" class="nav-link" @click='toggle = !toggle'>
                            <i class="bx bx-bar-chart-alt-2 icon"></i>
                            <span class="link">QL đối tượng</span>
                        </router-link>
                    </li>

                    <li class="list">
                        <router-link  to="/admin/catsex" class="nav-link" @click='toggle = !toggle'>
                            <i class="bx bx-bar-chart-alt-2 icon"></i>
                            <span class="link">QL danh mục đối tượng</span>
                        </router-link>
                    </li>

                    <li class="list">
                        <router-link  to="/admin/product" class="nav-link" @click='toggle = !toggle'>
                            <i class="bx bx-bar-chart-alt-2 icon"></i>
                            <span class="link">QL sản phẩm</span>
                        </router-link>
                    </li>


                    <li class="list">
                        <router-link  to="/admin/color" class="nav-link" @click='toggle = !toggle'>
                            <i class="bx bx-bar-chart-alt-2 icon"></i>
                            <span class="link">QL màu</span>
                        </router-link>
                    </li>

                    <li class="list">
                        <router-link  to="/admin/img" class="nav-link" @click='toggle = !toggle'>
                            <i class="bx bx-bar-chart-alt-2 icon"></i>
                            <span class="link">QL hình ảnh</span>
                        </router-link>
                    </li>

                    <li class="list">
                        <router-link  to="/admin/size" class="nav-link" @click='toggle = !toggle'>
                            <i class="bx bx-bar-chart-alt-2 icon"></i>
                            <span class="link">QL size</span>
                        </router-link>
                    </li>

                    <li class="list">
                        <router-link  to="/admin/bill" class="nav-link" @click='toggle = !toggle'>
                            <i class="bx bx-folder-open icon"></i>
                            <span class="link">QL đơn hàng</span>
                        </router-link>
                    </li>
                </ul>
                <div class="bottom-cotent" style="border-top:1px solid #ccc ;">
                    <li class="list">
                        <a href="#" class="nav-link" @click="logout">
                            <i class="bx bx-log-out icon"></i>
                            <span class="link">Đăng xuất</span>
                        </a>
                    </li>
                </div>
            </div>
        </div>


    </nav>
    <div class="overlay" @click='toggle = !toggle'></div>

    <div class="container" style="padding-top: 80px">
        <router-view></router-view>
    </div>
</template>
<style>
nav {
    -webkit-box-shadow: 0 3px 9px 3px rgba(0, 0, 0, 0.1);
    box-shadow: 0 3px 9px 3px rgba(0, 0, 0, 0.1);
}
</style>
<script>
// import css của admin
import '../assets/admin.css';
export default {
    data() {
        return {
            toggle: true,

        }
    },
    methods:
    {
        ontoggleModel() {
            this.toggle = !this.toggle
        },
        logout() {
            localStorage.removeItem('admin');
            // Nếu bạn muốn chuyển hướng trang sau khi đăng xuất, 
            // bạn có thể sử dụng phương thức router.push() của Vue Router
            this.$router.push('/admin_login');
        }
    }

}

</script>
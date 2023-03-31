<template>
    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar" v-bind:class="(toggle) ? 'show' : 'hide'" @click="ontoggleModel">
            <div id="dismiss" @click='toggle = !toggle'>
                <i class="fas fa-arrow-left"></i>
            </div>

            <div class="sidebar-header">
                <h5>Trang quản lý IVYMODA</h5>
            </div>

            <ul class="list-unstyled components">
                <!-- Trang chủ -->
                <li class="active">
                    <router-link :to="{ name: 'admin' }" href="#homeSubmenu" data-toggle="collapse"
                        aria-expanded="false">Trang chủ</router-link>
                </li>

                <!-- Khách hàng -->
                <li class="active">
                    <router-link :to="{ name: 'user' }" href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">QL
                        khách hàng</router-link>
                </li>

                <!-- Sản phẩm -->
                <li class="active">
                    <router-link :to="{ name: 'product' }" href="#homeSubmenu" data-toggle="collapse"
                        aria-expanded="false">QL
                        sản phẩm</router-link>
                </li>

                <!-- Danh mục -->
                <li class="active">
                    <router-link :to="{ name: 'category' }" href="#homeSubmenu" data-toggle="collapse"
                        aria-expanded="false">QL danh mục</router-link>
                </li>
                <!-- Danh mục -->
                <li class="active">
                    <router-link :to="{ name: 'sexes' }" href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">QL
                        đối tượng</router-link>
                </li>
                <li class="active">
                    <router-link :to="{ name: 'catsex' }" href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">QL
                        danh mục đối tượng</router-link>
                </li>
                <!-- Đơn hàng -->
                <li class="active">
                    <router-link :to="{ name: 'bill' }" href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">QL
                        đơn hàng</router-link>
                </li>
            </ul>
        </nav>

        <!-- Page Content  -->
        <div id="content">

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <button type="button" id="sidebarCollapse" class="btn btn-info" @click='toggle = !toggle'>
                        <i class="fas fa-align-left"></i>
                        <span>Menu</span>
                    </button>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav navbar-nav ml-auto">

                            <li class="nav-item active" style="margin-left:10px ;">
                                <!-- Trang chủ -->
                                <router-link :to="{ name: 'admin' }" href="#homeSubmenu" data-toggle="collapse"
                                    aria-expanded="false">Trang chủ</router-link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <router-view></router-view>
        </div>
    </div>

    <div class="overlay" v-bind:class="(toggle) ? '' : 'active'"></div>
</template>

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
        }
    }

}

</script>
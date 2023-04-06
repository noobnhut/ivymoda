<template>
    <div class="user_nav">
        <div class="user_info d-flex">
            <div class="info_avatar"><i class="fa-solid fa-user"></i></div>
            <div class="info_name">Nguyễn Minh Nhựt</div>
        </div>
        <hr>
        <div class="user_menu">
            <div class="user_info d-flex">
                <div class="info_avatar"><i class="fa-solid fa-user"></i></div>
                <div class="info_name"><router-link class="text-decoration-none text-dark" :to="{name:'information'}">Thông tin khách hàng</router-link></div>
            </div>
            
            <div class="user_info d-flex">
                <div class="info_avatar"><i class="fa-solid fa-camera-retro"></i></div>
                <div class="info_name"><router-link class="text-decoration-none text-dark" :to="{name:'productsee'}">Sản phẩm đã xem</router-link></div>
            </div>

            <div class="user_info d-flex">
                <div class="info_avatar"><i class="fa-solid fa-heart"></i></div>
                <div class="info_name"><router-link class="text-decoration-none text-dark" :to="{name:'productlike'}">Sản phẩm yêu thích</router-link></div>
            </div>

            <div class="user_info d-flex">
                <div class="info_avatar"><i class="fa-solid fa-cart-shopping"></i></div>
                <div class="info_name"><router-link class="text-decoration-none text-dark" :to="{name:'control_order'}">Theo dõi đơn hàng</router-link></div>
            </div>
        </div>
    </div>
</template>

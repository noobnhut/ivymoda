<template>
  <v-app class="bg">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="{ name: item.route }">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>ADMIN PAGE</v-toolbar-title>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="white--text">
            <v-avatar class="mr-2" size="36">
              <img style="width:50px" src="https://demoda.vn/wp-content/uploads/2022/02/avatar-anime-cute.jpg"
                alt="avatar">
            </v-avatar>
            WIBU mãi đỉnh
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
  
<script>
export default {
  data: () => ({
    drawer: false,
    items: [
      { title: 'Trang chủ', route: 'admin' },
      { title: 'Quản lý khách hàng', route: 'user' },
      { title: 'Quản lý sản phẩm', route: 'product' },
      { title: 'Quản lý danh mục', route: 'category' },
      { title: 'Quản lý đơn hàng', route: 'bill' },
    ],
  }),
}
</script>
<style>
.bg {

}
</style>

  
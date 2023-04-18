<template>
    <div class="mobile">
        <div class="mobile_close">
            <button class="btn_close" @click="onclose"><i class="fa-solid fa-x"></i></button>
        </div>
        <div class="navbar-nav ms-auto p-4">

            <router-link :to="{ name: 'home' }" class="nav-item nav-link ">Trang chủ</router-link>
            <router-link :to="{ name: 'about' }" class="nav-item nav-link ">Về chúng tôi</router-link>
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link " role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Danh mục sản phẩm
                    </a>
                    <ul class="dropdown-menu dropdown-menu-light">
                        <div class="container-fluid d-flex ">
                            <li class="px-2" v-for="sex in sexs">
                                <a class="dropdown-item" style="font-weight: bold;">{{ sex.Sexes_value }}</a>
                                <div class="dropdown-item" v-for="catsex in catsexs.filter(item => item.id_sex === sex.id)">
                                    <router-link class="text-decoration-none text-dark"
                                        :to="{ name: 'productbycat', params: { id: catsex.id } }">{{ catsex.cat_name
                                        }}</router-link>
                                </div>
                            </li>
                        </div>
                    </ul>
                </li>
            </ul>
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
                buttonLabel: 'Đăng nhập',
                sexs: [],
                catsexs: [],
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
        mounted() {
            this.getSex();
            this.getcatsex();

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
            async getSex() {
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

        }
    }
</script>
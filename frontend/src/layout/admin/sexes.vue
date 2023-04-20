<template>
    <div class="container">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                        <h2>Quản lý <b>đối tượng</b></h2>
                    </div>
                    <div class="col-sm-6">
                        <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                                class="fa-solid fa-circle-plus"></i> <span>Thêm đối tượng</span></a>
                    </div>
                </div>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Tên đối tượng:</th>
                        <th>Actions:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cat in cats">
                        <td>{{ cat.Sexes_value }}</td>
                        <td>
                            <a type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModaledit"><i
                                    class="fa-solid fa-spinner" @click="select(cat)"></i></a>
                            <a class="delete" @click="deleteSex(cat.id)"><i class="fa-solid fa-trash-can"></i></a>
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
                        <label>Tên đối tượng:</label>
                        <input type="text" class="form-control" v-model="Sexes_value">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" @click="addSex">Thêm</button>
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
                        <label>Tên đối tượng:</label>
                        <input type="text" class="form-control" v-model="Sexes_value">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" @click="updateSex">Cập nhập</button>
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
                cats: [],
                Sexes_value: '',
                id: ''
            }
        },
        components: {
            toast
        },
        mounted() {
            this.getSex();

        },
        methods: {
            select(cat) {
                this.Sexes_value = cat.Sexes_value,
                    this.id = cat.id
                console.log(this.id)
            },
            async addSex() {
                const catadd = await this.$axios.post(
                    'addSex',
                    {
                        Sexes_value: this.Sexes_value
                    }
                )
                this.$refs.toast.showToast(catadd.data.message)
                this.getSex()

            },
            async getSex() {
                try {
                    const result = await this.$axios.get(
                        `getsex`
                    );
                    this.cats = result.data;
                    console.log(result);

                } catch (e) {
                    console.log(e);
                }
            },
            async updateSex() {

                const sexupdate = await this.$axios.put(
                    `updateSex/` + this.id,
                    {
                        Sexes_value: this.Sexes_value
                    }
                )
                this.$refs.toast.showToast(sexupdate.data.message)
                this.getSex()
            },
            async deleteSex(id) {
                const sexdelete = await this.$axios.delete(
                    `deleteSex/` + id
                )
                this.$refs.toast.showToast(sexdelete.data.message)
                this.getSex()

            },
        }
    }
</script>
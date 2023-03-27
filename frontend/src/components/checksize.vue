<template>
    <div class="checksize">
        <div class="check_close">
            <button class="btn_close" @click="onclose"><i class="fa-solid fa-x"></i></button>
        </div>
        <h3 class="title_size">BẢNG TƯ VẤN SIZE</h3>
        <div class="container">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" href="#tab1" data-toggle="tab" :class="{ 'active': activeTab === 'tab1' }"
                        @click.prevent="activeTab = 'tab1'">Nam</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#tab2" data-toggle="tab" :class="{ 'active': activeTab === 'tab2' }"
                        @click.prevent="activeTab = 'tab2'">Nữ</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#tab3" data-toggle="tab" :class="{ 'active': activeTab === 'tab3' }"
                        @click.prevent="activeTab = 'tab3'">Trẻ em</a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane" id="tab1" :class="{ 'active': activeTab === 'tab1' }">
                    <div class="checksize_info">
                        <h4>SIZE ÁO</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>TÊN GỌI/SIZE</th>
                                    <th>S</th>
                                    <th>M</th>
                                    <th>L</th>
                                    <th>XL</th>
                                    <th>XXL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in tableDataAoNam" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.s }}</td>
                                    <td>{{ item.m }}</td>
                                    <td>{{ item.l }}</td>
                                    <td>{{ item.xl }}</td>
                                    <td>{{ item.xxl }}</td>
                                </tr>
                            </tbody>
                        </table>
    
                        <h4>SIZE QUẦN</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>TÊN GỌI/SIZE</th>
                                    <th>S</th>
                                    <th>M</th>
                                    <th>L</th>
                                    <th>XL</th>
                                    <th>XXL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in tableDataQuanNam" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.s }}</td>
                                    <td>{{ item.m }}</td>
                                    <td>{{ item.l }}</td>
                                    <td>{{ item.xl }}</td>
                                    <td>{{ item.xxl }}</td>
                                </tr>
                            </tbody>
                        </table>
    
                        <h4>SIZE GIÀY</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>TÊN GỌI/SIZE</th>
                                    <th>39</th>
                                    <th>40</th>
                                    <th>41</th>
                                    <th>42</th>
                                    <th>43</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in tableDataGiayNam" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.s }}</td>
                                    <td>{{ item.m }}</td>
                                    <td>{{ item.l }}</td>
                                    <td>{{ item.xl }}</td>
                                    <td>{{ item.xxl }}</td>
                                    <td>{{ item.xxxl }}</td>
    
                                </tr>
                            </tbody>
                        </table>
                    </div>

                  
                    
                </div>
                <div class="tab-pane" id="tab2" :class="{ 'active': activeTab === 'tab2' }">
                     <!--nu-->
                     <div class="checksize_info">
                        <h4>SIZE ÁO</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>TÊN GỌI/SIZE</th>
                                    <th>S</th>
                                    <th>M</th>
                                    <th>L</th>
                                    <th>XL</th>
                                    <th>XXL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in tableDataAoNam" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.s }}</td>
                                    <td>{{ item.m }}</td>
                                    <td>{{ item.l }}</td>
                                    <td>{{ item.xl }}</td>
                                    <td>{{ item.xxl }}</td>
                                </tr>
                            </tbody>
                        </table>
    
                        <h4>SIZE QUẦN</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>TÊN GỌI/SIZE</th>
                                    <th>S</th>
                                    <th>M</th>
                                    <th>L</th>
                                    <th>XL</th>
                                    <th>XXL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in tableDataQuanNam" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.s }}</td>
                                    <td>{{ item.m }}</td>
                                    <td>{{ item.l }}</td>
                                    <td>{{ item.xl }}</td>
                                    <td>{{ item.xxl }}</td>
                                </tr>
                            </tbody>
                        </table>
    
                        <h4>SIZE GIÀY</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>TÊN GỌI/SIZE</th>
                                    <th>39</th>
                                    <th>40</th>
                                    <th>41</th>
                                    <th>42</th>
                                    <th>43</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in tableDataGiayNam" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.s }}</td>
                                    <td>{{ item.m }}</td>
                                    <td>{{ item.l }}</td>
                                    <td>{{ item.xl }}</td>
                                    <td>{{ item.xxl }}</td>
                                    <td>{{ item.xxxl }}</td>
    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane" id="tab3" :class="{ 'active': activeTab === 'tab3' }">
                     <!--tre con-->
                     <div class="checksize_info">
                        <h4>SIZE ÁO</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>TÊN GỌI/SIZE</th>
                                    <th>S</th>
                                    <th>M</th>
                                    <th>L</th>
                                    <th>XL</th>
                                    <th>XXL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in tableDataAoNam" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.s }}</td>
                                    <td>{{ item.m }}</td>
                                    <td>{{ item.l }}</td>
                                    <td>{{ item.xl }}</td>
                                    <td>{{ item.xxl }}</td>
                                </tr>
                            </tbody>
                        </table>
    
                        <h4>SIZE QUẦN</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>TÊN GỌI/SIZE</th>
                                    <th>S</th>
                                    <th>M</th>
                                    <th>L</th>
                                    <th>XL</th>
                                    <th>XXL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in tableDataQuanNam" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.s }}</td>
                                    <td>{{ item.m }}</td>
                                    <td>{{ item.l }}</td>
                                    <td>{{ item.xl }}</td>
                                    <td>{{ item.xxl }}</td>
                                </tr>
                            </tbody>
                        </table>
    
                        <h4>SIZE GIÀY</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>TÊN GỌI/SIZE</th>
                                    <th>39</th>
                                    <th>40</th>
                                    <th>41</th>
                                    <th>42</th>
                                    <th>43</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in tableDataGiayNam" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.s }}</td>
                                    <td>{{ item.m }}</td>
                                    <td>{{ item.l }}</td>
                                    <td>{{ item.xl }}</td>
                                    <td>{{ item.xxl }}</td>
                                    <td>{{ item.xxxl }}</td>
    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default
    {
        data() {
            return {
                activeTab: 'tab1',

                tableDataAoNam: [
                    { name: 'Cổ', s: 36, m: 38, l: 40, xl: 42, xxl: 44 },
                    { name: 'Vai', s: 44, m: 45, l: 46, xl: 47, xxl: 48 },
                    { name: 'Ngực', s: 90, m: 94, l: 98, xl: 102, xxl: 106 },
                    { name: 'Eo', s: 88, m: 92, l: 96, xl: 100, xxl: 104 }
                ],
                tableDataQuanNam: [
                    { name: 'Vòng Eo', s: 76, m: 80, l: 84, xl: 86, xxl: 90 },
                    { name: 'Vòng Mông', s: 91, m: 955, l: 99, xl: 104, xxl: 109 },
                    { name: 'Cân nặng (kg)', s: '62 -> 68', m: '68 -> 70', l: '70 -> 74', xl: '74 -> 78', xxl: '78 -> 82' },
                    { name: 'Chiều cao (cm)', s: '162 -> 168', m: '168 -> 172', l: '172 -> 176', xl: '176 -> 180', xxl: '180 -> 184' }
                ],
                tableDataGiayNam: [
                    { name: 'Chiều dài bàn chân', s: '20,5', m: '26', l: '26,9', xl: '27,7', xxl: '28,5',xxl: '29,4' },
                ],


            }
        },
        methods: {
            onclose() {
                this.$emit('cancelcheck')
            },
        },

    }
</script>
<style>
.checksize {
    height: 100%;
    outline: none;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 44px;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 99994;
    width: 100%;
    max-width: 1200px;
    background-color: white;
    box-shadow: 10px 10px 5px #ccc;
    -moz-box-shadow: 10px 10px 5px #ccc;
    -webkit-box-shadow: 10px 10px 5px #ccc;
    -khtml-box-shadow: 10px 10px 5px #ccc;
    border: 3px solid #e9ecef;
}
.checksize .checksize_info
{
    margin-top: 10px;
    border: 1px solid #e9ecef;
    padding: 10px 20px;
}
.checksize .title_size
{
    color: #221f20;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    line-height: 32px;
    margin-bottom: 24px
}
.checksize h4 {
    margin-top: 24px;
    color: #221F20;

}

.checksize .nav-link,
.checksize .nav-tabs {
    border: none;
    color: black;
}

.checksize .nav-tabs .active {
    border-bottom: 2px solid #221F20;
}</style>
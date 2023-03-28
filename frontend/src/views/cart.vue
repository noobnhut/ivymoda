<template>
    <navbar />
    <div class="container" style="padding-top:80px;">
        <div class="row">
            <div class="col-12 col-lg-8 col-xl">
                <div class="content_right">
                    <div class="title_right d-flex">
                        <h3 class="fw-bold">Giỏ hàng của bạn <span style="font-size:20px;color:red">1 Sản Phẩm</span></h3>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Tổng tiền</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >
                                    <div class="cart_item">
                                        <div class="cart_item d-flex">
                                            <div class="item_img">
                                                <img src="https://pubcdn.ivymoda.com/files/product/thumab/400/2023/03/21/1ecdac8afe8ae7614c52818c2f92e6bc.jpg"
                                                    alt="">
                                            </div>
                                            <div class="item_info">
                                                <p class="d-flex">Áo ren dáng ôm tay phồng</p>
                                                <div class="item_info_detail d-flex">
                                                    <p class="detail">Màu trắng</p>
                                                    <p class="detail">Size:XXXXXX</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td><input type="number"></td>
                                <td  class="fw-bold ">100.000 đồng</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-lg-4 ">
                <div class="content_left">
                    <h3 class="d-flex fw-bold">Tổng tiền giỏ hàng</h3>
                    <div class="d-flex sum_product justify-content-between">
                        <span>Tổng sản phẩm đã mua</span>
                        <span>1</span>
                    </div>

                    <div class="d-flex sum_cart justify-content-between">
                        <span>Tổng tiền tạm tính</span>
                        <span>100.000 đồng</span>
                    </div>

                    <div class="d-flex final_cart justify-content-between">
                        <span>Thành tiền</span>
                        <span>100.000 đồng</span>
                    </div>

                    <hr>

                    <div class="d-flex btn_cart justify-content-between">
                        <button class="btn_user">
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footerV />
</template>

<script>
import navbar from '../components/navbar.vue';
import footerV from '../components/footer.vue';
export default
    {
        components:
        {
            navbar,
            footerV,
        }
    }
</script>
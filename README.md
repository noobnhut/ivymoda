<div class="dropdown item_action">
          <button @click="handleButtonClick" class="btn_custom"  data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-user"></i>
          </button>
          <ul class="dropdown-menu sub-action" >
            <div class="top-action">
              <a class="icon">
                <h3>Tài khoản của tôi</h3>
              </a>
            </div>
            <ul>
              <li><router-link class="text-decoration-none text-dark" :to="{ name: 'information' }"><i
                    style="margin-right: 10px;" class="fa-solid fa-user"></i>Thông tin tài
                  khoản</router-link></li>
              <li><router-link class="text-decoration-none text-dark" :to="{ name: 'productsee' }"><i
                    style="margin-right: 10px;" class="fa-solid fa-camera-retro"></i>Sản phẩm đã
                  xem</router-link></li>
              <li><router-link class="text-decoration-none text-dark" :to="{ name: 'productlike' }"><i
                    style="margin-right: 10px;" class="fa-solid fa-heart"></i>Sản phẩm yêu
                  thích</router-link></li>
              <li><router-link class="text-decoration-none text-dark" :to="{ name: 'control_order' }"><i
                    style="margin-right: 10px;" class="fa-solid fa-cart-shopping"></i>Theo dõi đơn hàng</router-link></li>
              <li><a class="text-decoration-none text-dark" @click="outWeb"><i style="margin-right: 10px;"
                    class="fa-solid fa-circle-xmark"></i>Đăng xuất</a></li>
            </ul>
          </ul>
        </div>
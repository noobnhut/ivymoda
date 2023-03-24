<template>
    <div class="product_view">
        <div class="title_product">
            Danh sách sản phẩm
        </div>
        <Carousel :items-to-show="2.5" :wrap-around="true">
            <Slide v-for="slide in 10" :key="slide">
              <div class="carousel__item">
                <div class="card" style="width: 18rem;">
                    <img src="https://vapa.vn/wp-content/uploads/2022/12/anh-mang-cute-001.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Số {{slide}}</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">An item</li>
                    </ul>
                    <div class="card-body">
                      <a class="card-link">Card link</a>
                      <a class="card-link">Another link</a>
                    </div>
                  </div>
              </div>
            </Slide>
        
            <template #addons>
              <Navigation />
            </template>
          </Carousel>
    </div>
</template>

<script>
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
export default {
    components: {
    Carousel,
    Slide,
    Navigation,
  },
}

</script>

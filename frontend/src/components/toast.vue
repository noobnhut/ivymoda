<template>
    <div id="app"> 
        <div class="toast-overlay" v-show="visible">
        <div class="toast-container">
          <div ref="toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" :class="{ 'show': visible }">
            <div class="toast-header">
              <strong class="me-auto">Thông báo</strong>
              <button @click="reload" type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
              {{ message }}  
            </div>
            <div class="d-flex justify-content-center py-2">
            <button class="btn btn-light"  @click="reload">Đồng ý</button>
            </div>
          </div>
        </div>
    </div>  
      </div>
</template>
<style>

.toast-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    pointer-events: auto;
  }
  
  .toast-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
  }
</style>
<script>
export default {
    data() {
        return {
            visible: false,
            message: '',
        }
    },
    methods: {
        showToast(message) {
            this.message = message
            this.visible = true
        },
        reload()
        {
          this.visible = false
        }
    },
}
</script>

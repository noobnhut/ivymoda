<template>
    <div class="position-fixed top-0 end-0 p-3" style="z-index:10000">
        <div ref="toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" :class="{ 'show': visible }">
            <div class="toast-header">
                <strong class="me-auto">Thông báo</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ message }}
            </div>
        </div>
    </div>
</template>

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

            setTimeout(() => {
                this.visible = false
            }, 4000,location.reload())
            
        },
    },
}
</script>

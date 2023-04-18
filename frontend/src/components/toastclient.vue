<template>
    <div id="toast-container" class="toast-bottom-right" v-show="visible" >
        <div class="toast toast-info" aria-live="polite" style="display: block;">
            <div class="toast-message">{{ message }}</div>
        </div>
    </div>
</template>

<script>
import '../assets/toast.css'
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
            }, 3000) // thời gian đợi 3 giây trước khi ẩn toast
        },
    },
}

</script>
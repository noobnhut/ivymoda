<template>
    <navbar />
     <router-view  />
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
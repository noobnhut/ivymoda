<template>
<navbar/>
<div class="container-lg" style="padding-top:100px;">
<banner/>
</div>

<footerV/>
</template>

<script>

import navbar from '../components/navbar.vue';
import footerV from '../components/footer.vue';
import banner from '../components/banner.vue';
import '../assets/client.css'

export default
{
    components:
    {
        navbar,
        footerV,
        banner
    }
}
</script>
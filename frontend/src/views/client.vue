<template>
<navbar/>
<div class="container" style="padding-top:80px;">
<banner/>
<product/>
<minibanner/>
<gallery/>
</div>

<footerV/>
</template>

<script>

import navbar from '../components/navbar.vue';
import footerV from '../components/footer.vue';
import banner from '../components/banner.vue';
import minibanner from '../components/minibanner.vue';
import product from '../components/product.vue';
import gallery from '../components/gallery.vue';
import '../assets/client.css'

export default
{
    components:
    {
        navbar,
        footerV,
        banner,
        minibanner,
        gallery,
        product
    }
}
</script>
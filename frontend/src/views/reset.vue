<template>
<navbar/>

   <div class="container-fluid" style="padding-top:100px">
    <router-view></router-view>
   </div>

<footerV/>
</template>

<script>
import navbar from '../components/navbar.vue';
import footerV from '../components/footer.vue';
export default
{
    components:
    {
        navbar,
        footerV
    }
}
</script>
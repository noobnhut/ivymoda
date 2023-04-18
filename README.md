<template>
    <div>
        <navbar />
        <div class="container" style="padding-top: 100px;">
            <h1>Kết quả tìm kiếm theo '{{ this.searchQuery }}'</h1>
            <ul>
                <li v-for="product in searchResults" :key="product.id">
                    <img :src="product.image" alt="" style="width: 100px;">
                    <h3>{{ product.name }}</h3>
                    <p>{{ product.description }}</p>
                </li>
            </ul>
        </div>
        <footerV />
    </div>
</template>
  
<script>
import navbar from '../components/navbar.vue';
import footerV from '../components/footer.vue';

export default {
    components: {
        navbar,
        footerV
    },
    data() {
        return {
            searchQuery: '',
            searchResults: []
        };
    },
    mounted() {
        this.searchQuery = this.$route.query.q;
        this.searchProducts();
    },
    methods: {
        async searchProducts() {
            if (this.searchQuery.length > 0) {
                const response = await this.$axios.get(`search?q=${this.searchQuery}`);
                const results = response.data;
                const filteredResults = results.filter(result => result.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
                this.searchResults = filteredResults.map(result => ({
                    id: result.id,
                    name: result.name,
                    url: result.url,
                    images: result.images,
                    id_cat: result.id_cat,
                    color_id: result.color_id
                }));
                this.showResults = true;
            } else {
                this.searchResults = [];
                this.showResults = false;
            }
        },
    }
};
</script>
<template>
    <div v-if="product">
        <div class="product">
            <div class="product-image">
                <img :src="product.image" alt="" srcset="">
            </div>
            <div class="product-info">
                <h1>{{product.name}}</h1>
                <div class="product-cost">￥{{product.cost}}</div>
                <div class="product-add-cart" @click="handleAddToCart">加入购物车</div>
            </div>
        </div>
        <div class="product-desc">
            <h2>产品介绍</h2>
            <img src="../images/avatar.jpg" alt="">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            id: parseInt(this.$route.params.id),
            product: null
        }
    },
    methods: {
        getProduct() {
            this.product = this.$store.state.productList.find(item => item.id === this.id);
        },
        handleAddToCart() {
            debugger
            this.$store.commit('addCart', this.id)
        }
    },
    mounted() {
        // 初始化时请求数据
        this.getProduct();
    }
}
</script>
<style scoped>
    .product{
        margin: 32px;
        padding: 32px;
        background-color: #fff;
        border: 1px solid #dddee1;
        border-radius: 10px;
        overflow: hidden;
    }
    .product-image{
        width: 50%;
        height: 550px;
        float: left;
        text-align: center;
    }
    .product-info {
        width: 50%;
        height: 150px;
        padding: 150px 0 250px;
        float: left;
        text-align: center;
    }
    .product-cost{
        color: #f2352e;
        margin: 8px 0;
    }
    .product-add-cart{
        display: inline-block;
        padding: 8px 64px;
        margin: 8px 0;
        background-color: #2d8cf0;
        color: #fff;
        border-radius: 4px;
        text-align: center;
    }
    .product-desc img{
        display: block;
        width: 50%;
        margin:  32px auto;
        padding: 32px;
        border-bottom: 1px solid #dddee1;
    }
</style>
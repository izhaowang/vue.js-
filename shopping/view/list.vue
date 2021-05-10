<template>
    <div v-show="list.length">
        <div class="list-control">
            <div class="list-control-filter">
                <span>品牌：</span>
                <span
                    class="list-control-filter-item"
                    :class="{on: item === filterBrand}"
                    v-for="(item, index) in brands"
                    :key="index"
                    @click="handleFilterBrand(item)"
                >{{item}}</span>
            </div>
            <div class="list-control-filter">
                <span></span>
                <span
                    class="list-control-filter-item"
                    :class="{on: item === filterColor}"
                    v-for="(item, index) in colors"
                    :key="index"
                    @click="handleFilterColor(item)"
                >{{item}}</span>
            </div>
            <div class="list-control-order">
                <span>排序：</span>
                <span
                    class="list-control-order-item"
                    :class="{on: order === ''}"
                    @click="handleOrderDefault"
                >默认</span>
                <span
                    class="list-control-order-item"
                    :class="{on: order === 'sales'}"
                    @click="handleOrderSales"
                >
                    销量
                    <template>下</template>
                </span>
                
                <span
                    class="list-control-order-item"
                    :class="{on: order.indexOf('cost') > -1}"
                    @click="handleOrderCost"
                >价格
                    <template v-if="order === 'cost-asc'">上</template>
                    <template v-if="order === 'cost-desc'">下</template>
                </span>
            </div>
        </div>
       <Product v-for="item in filteredAndOrderList" :info="item" :key="item.id">
       </Product>
       <div class="product-not-foun" v-show="!filteredAndOrderList.length">暂无相关商品</div>
    </div>
</template>
<script>
import Product from '../component/product.vue'
export default {
    data() {
        return {
            // 排序依据：sales销量、 constt-desc价格降序、 cost-asc价格升序
            order:'',
            filterBrand: '',
            filterColor: ''
        }
    },
    methods: {
        handleOrderDefault() {
            this.order = ''
        },
        handleOrderSales() {
            this.order = 'sales'
        },
        handleOrderCost() {
            if(this.order === 'cost-desc') {
                this.order = 'cost-asc';
            } else {
                this.order = 'cost-desc';
            }
        },
        
        // 筛选品牌
        handleFilterBrand(brand) {
            // 单词点击选择，再次点击取消选择
            if(this.filterBrand === brand) {
                this.filterBrand = '';
            } else {
                this.filterBrand = brand;
            }
        },
        // 筛选颜色
        handleFilterColor(color) {
            // 单词点击选择，再次点击取消选择
            if(this.filterColor === color) {
                this.filterColor = '';
            } else {
                this.filterColor = color;
            }
        }
    },
    components: {
        Product: Product
    },
    computed: {
        list() {
            return this.$store.state.productList
        },
        brands() {
            return this.$store.getters.brands
        },
        colors() {
            return  this.$store.getters.colors
        },
        filteredAndOrderList() {
            let list = [...this.list]; // 赋值一份数据
            // 按品牌过滤
            if (this.filterBrand !== '') {
                list = list.filter(item => item.brand === this.filterBrand);
            }
            // 按颜色过滤
            if (this.filterColor !== '') {
                list = list.filter(item => item.color === this.filterColor);
            }
            // 排序
            if (this.order !== '') {
                if(this.order === 'sales') {
                    list = list.sort((a, b) => b.sales - a.sales)
                } else if (this.order == 'cost-desc') {
                    list = list.sort((a, b) => b.cost - a.cost1)
                } else if (this.order === 'cost-asc') {
                    list = list.sort((a, b) => a.cost - b.cost)
                }
            }
            return list
        }
    },
    mounted() {
        this.$store.dispatch('getProductList')
    }
}
</script>
<style scoped>
    .list-control {
        background-color: #fff;
        border-radius: 6px;
        margin: 16px;
        padding: 16px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    }
    .list-control-filter{
        margin-bottom: 16px;
    }
    .list-control-filter-item,
    .list-control-order-item{
        cursor: pointer;
        display: inline-block;
        border: 1px solid #e9eaec;
        border-radius: 4px;
        margin-right: 6px;
        padding: 2px 6px;
    }
    .list-control-filter.on,
    .list-control-order-item.on{
        background-color: #f2352e;
        border: 1px solid #f2352e;
        color: #fff;
    }
    .product-not-found {
        text-align: center;
        padding: 32px;
    }
</style>
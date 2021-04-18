<template>
    <div>
        <v-title title="vue组件化"></v-title>
        <v-button @click="handleClick">
             <template slot=header slot-scope="slotProps">
                <h1>Here might be a page title {{slotProps.user}}</h1>
            </template>
        </v-button>
        <p>
            <img src="./images/avatar.jpg" alt="">
        </p>
        <router-view></router-view>
    </div>
</template>
<script>
import vTitle from './title.vue'
import vButton from './button.vue'
export default {
    data() {
        return {
            name: 'hi vue'
        }
    },
    methods: {
        handleClick(e) {
            console.log(e);
        },
    },
    components: {
        vTitle,
        vButton
    }
}
</script>
<style scoped>
    div {
        color: #f60;
        font-size: 24px;
    }
</style>
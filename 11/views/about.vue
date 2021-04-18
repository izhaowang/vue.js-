<template>
    <div>
        介绍页{{data}}
        <button @click="update">修改</button>
        <hr/>
        {{count}}
        {{$store.state.count}}
        <button @click="add">加1</button>
        <button @click="reduce">减1</button>
        <button @click="cal(10)">计算</button>
        <p>{{$store.getters.filterPreList}}</p>
        <p>{{reverseList}}</p>
        <button @click="asyncBtn">StoreFORactions</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: 'sh'
        }
    },
   beforeRouterEnter:() => {
       console.log('组件首尾beforeRouterEnter');
   },
   
   beforeRouterUpdate:() => {
       console.log('组件首尾beforeRouterUpdate');
   },
   
   beforeRouterLeave:() => {
       console.log('组件首尾beforeRouterLeave');
   },
   methods: {
        update() {
           this.data = 'hi'
           this.$router.push('/user/123')
        },
        add() {
            this.$store.commit('increase')
        },
        reduce() {
            this.$store.commit('decrease')
        },
        cal(n) {
            this.$store.commit({
                type: 'cal',
                n
            })
        },
        asyncBtn() {
            this.$store.dispatch('increase')
        }
       
   },
   computed: {
       count() {
           return this.$store.state.count
       },
       reverseList() {
           return this.$store.getters.reversePreList
       }
   }
}
</script>
<style scoped>
    
</style>
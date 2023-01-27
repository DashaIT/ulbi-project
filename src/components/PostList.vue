<template>
    <div>
        <h3>Список постов</h3>
        <PostItem  
            v-for="post in posts"
            :post="post"/>
    </div>
</template>

<script>
import PostItem from "@/components/PostItem.vue"
export default {
    props: {
        posts: {
            type: Array,
            required: true,
        }
    },

    components: {
        PostItem
    },

    data() {
        return {

        }
    }
}
</script>

<style scoped>

</style>
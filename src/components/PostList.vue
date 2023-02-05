<template>
    <div v-if="posts.length">
        <h3>Список постов</h3>
        <transition-group>
            <PostItem v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)" />
        </transition-group>
    </div>
    <h2 style="color: red" v-else>Список постов пуст</h2>
</template>

<script>
import PostItem from "@/components/PostItem"
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
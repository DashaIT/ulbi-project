<template>
    <div class="app">
        <PostForm @create="createPost" />
        <PostList :posts="posts" />
    </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList";
export default {
    components: {
        PostList, PostForm
    },

    data() {
        return {
            posts: [
                { id: 1, title: 'JavaScript', body: 'Description of post' },
                { id: 2, title: 'JavaScript 2', body: 'Description of post 2' },
                { id: 3, title: 'JavaScript 3', body: 'Description of post 3' },
            ],
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
        },

    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}

form {
    display: flex;
    flex-direction: column;
}
</style>
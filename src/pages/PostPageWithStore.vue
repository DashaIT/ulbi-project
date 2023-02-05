<template>
    <div>
        
        <h1>Страница с постами</h1>
         <!-- <MyInput 
            v-model="searchQuery"
            placeholder="Поиск..."
            v-focus
        />
        <div class="app__btns">
            <MyButton
                @click="showDialog"                
            >
                Создать пост
            </MyButton>
            <my-select :options="sortOptions" v-model="selectedSort"/>
        </div> -->
        
        <MyDialog v-model:show="dialogVisible">
            <PostForm @create="createPost" />
        </MyDialog>

        <PostList v-if="!isPostLoading" :posts="sortedAndSearchedPosts" @remove="removePost" />
        <div v-else>Идет загрузка...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- <div class="page__wrapper">
            <div 
                v-for="pageNumber in totalPages" 
                :key="pageNumber"
                class="page"
                :class="{
                    'current-page': page === pageNumber
                }"  
                @click="changePage(pageNumber)"              
            >
                {{ pageNumber }}
            </div>
        </div> -->
    </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList";
import axios from 'axios';

export default {
    components: {
        PostList, PostForm
    },

    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                { value: 'title', name: 'По названию' },
                { value: 'body', name: 'По описанию' },
            ],
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id != post.id)
        },
        showDialog() {
            this.dialogVisible = true;
        },
        // changePage(pageNumber) {
        //     this.page = pageNumber;
        // },        


    },
    mounted() {
        // this.fetchPosts();        

    },
    computed: {

    },
    watch: {
        // selectedSort(newValue) {
        //    this.posts.sort((post1, post2) => {
        //         return post1[newValue]?.localeCompare(post2[newValue])
        //    })
        // }, 
        // page() {
        //     this.fetchPosts()
        // }      
    }
}
</script>

<style>
form {
    display: flex;
    flex-direction: column;
}

.app__btns {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10px;
    margin-right: 5px;
}

.current-page {
    border: 2px solid green;
}

.observer {
    height: 38px;
    background: green;
}
</style>
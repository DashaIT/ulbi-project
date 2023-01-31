<template>
    <div>
        <h1>Страница с постами</h1>
        <MyInput 
            v-model="searchQuery"
            placeholder="Поиск..."
        />
        <div class="app__btns">
            <MyButton
                @click="showDialog"                
            >
                Создать пост
            </MyButton>
            <my-select :options="sortOptions" v-model="selectedSort"/>
        </div>
        
        <MyDialog v-model:show="dialogVisible">
            <PostForm @create="createPost" />
        </MyDialog>

        <PostList v-if="!isPostLoading" :posts="sortedAndSearchedPosts" @remove="removePost" />
        <div v-else>Идет загрузка...</div>
        <div ref="observer" class="observer"></div>
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
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'},
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
        async fetchPosts() {
            try {
                this.isPostLoading = true;                
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts = response.data; 
            } catch(e) {                               
                alert('Ошибка')
            } finally {
                this.isPostLoading = false;
            }            
        },
        async loadMorePosts() {
            try {
                this.page += 1;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts = [...this.posts, ...response.data]; 
            } catch(e) {                               
                alert('Ошибка')
            }          
        }

    },
    mounted() {
        this.fetchPosts();
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) =>  {
            if (entries[0].isIntersecting && this.page < this.totalPages) {
                this.loadMorePosts()
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer);

    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            })
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
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
<template>
    <div class="navbar">
        <div @click="$router.push('/')">Vue 3</div>
        <div class="navbar__btns">
            <MyButton @click="$router.push('/posts')">Посты</MyButton>
            <MyButton @click="$router.push('/about')" style="margin-left: 20px">О сайте</MyButton>
            <MyButton @click="$router.push('/store')" style="margin-left: 20px">Store</MyButton>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.navbar {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
}

.navbar__btns {
    margin-left: auto;
}
</style>
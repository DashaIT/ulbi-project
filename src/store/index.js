import { createStore } from "vuex";


export default createStore({
    state: {
        likes: 1,
        isAuth: true,
    }, //описываем данные

    getters: {
        doubleLikes(state) {
           return state.likes * 2
        }
    },//computed-свойства

    mutations: {
        incrementLikes(state) {
            state.likes += 1
        },
        decrementLikes(state) {
            state.likes -= 1
        }
    }, //ф-и, внутри которых меняем значение поля в состоянии

    actions: {

    }, // функции, к-е внутри себя используют мутации

    modules: {

    }, //изолированный кусок состояния со своими геттерами, мутациями и экшенами
})
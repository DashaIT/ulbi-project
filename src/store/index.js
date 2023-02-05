import { createStore } from "vuex";
import { postModule } from "./postModule";


export default createStore({    
    modules: {
        post: postModule
    }, //изолированный кусок состояния со своими геттерами, мутациями и экшенами
})
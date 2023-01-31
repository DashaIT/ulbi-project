import { createApp } from 'vue';
import App from  './App';
import components from '@/components/UI';
import router from './router/router';

const app = createApp(App)

//глобальная регистрация UI-компонентов
components.forEach(component => {
    app.component(component.name, component)
})

app
    .use(router)
    .mount('#app');

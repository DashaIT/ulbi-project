import { createApp } from 'vue';
import App from  './App';
import components from '@/components/UI';

const app = createApp(App)

//глобальная регистрация UI-компонентов
components.forEach(component => {
    app.component(component.name, component)
})

app.mount('#app');

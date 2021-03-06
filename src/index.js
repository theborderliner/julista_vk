import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from "@vkontakte/vk-connect";
import App from './App';
// import store from "./redux/store/main";
// import {Provider} from "react-redux"
// import registerServiceWorker from './sw';
import mVKMiniAppsScrollHelper from '@vkontakte/mvk-mini-apps-scroll-helper';
import './index.css'

// Init VK App
connect.send('VKWebAppInit', {});

// Если вы хотите, чтобы ваше веб-приложение работало в оффлайне и загружалось быстрее,
// расскомментируйте строку с registerServiceWorker();
// Но не забывайте, что на данный момент у технологии есть достаточно подводных камней
// Подробнее про сервис воркеры можно почитать тут — https://vk.cc/8MHpmT

const root = document.getElementById('root');
mVKMiniAppsScrollHelper(root);


ReactDOM.render(
    <App/>
    , root);

// registerServiceWorker();
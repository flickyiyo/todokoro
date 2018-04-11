import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home';
import Metrics from '@/components/Metrics';
import Board from '@/components/Board';
import Login from '@/components/Login';

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', component: Login, name: 'login' },
    {
      path: '/', component: Home, children: [
        { path: '/metrics', component: Metrics, name: 'metrics' },
        { path: '/board', component: Board, name: 'board' },
      ]
    },
  ]
})

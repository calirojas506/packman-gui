import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: require('@/components/Start').default
    },
    {
      path: '/dependencies',
      name: 'dependencies',
      component: require('@/components/Dependencies').default
    },
    {
      path: '/outdated',
      name: 'outdated',
      component: require('@/components/Outdated').default
    },
    {
      path: '/install',
      name: 'install',
      component: require('@/components/Install').default
    },
    {
      path: '/uninstall',
      name: 'uninstall',
      component: require('@/components/Uninstall').default
    },
    {
      path: '/update',
      name: 'update',
      component: require('@/components/Update').default
    },
    {
      name: 'about',
      path: '/about',
      component: require('@/components/About').default
    },
    {
      name: 'search',
      path: '/search',
      component: require('@/components/Search').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

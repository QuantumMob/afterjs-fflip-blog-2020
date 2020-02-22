import { asyncComponent } from '@jaredpalmer/after';

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      // import is required -> returns promise
      loader: () => import('./shared/sections/Home')
    })
  },
  {
    path: '/about',
    exact: true,
    component: asyncComponent({
      loader: () => import('./shared/sections/About')
    })
  },
  {
    path: '/store',
    exact: true,
    component: asyncComponent({
      loader: () => import('./shared/sections/Store')
    })
  },
  ...(
    process.env.NODE_ENV !== 'production'
      ? [{
        path: '/asset-master',
        exact: true,
        component: asyncComponent({
          loader: () => import('./shared/sections/AssetMaster')
        })
      }]
      : [])
];

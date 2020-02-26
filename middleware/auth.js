export default async function ({ app, route, store, redirect, req, $axios}) {
  const token = store.state.token
  const requiresAuth = route.meta[0].requiresAuth
  const isServer = process.server
  const maybeReq = process.server ? req : null
  const hasSession = maybeReq !== null && !!maybeReq.session

  if(!isServer) {
    if (!token && requiresAuth) {
      app.$errorHandler({message: '請先登入'});
      return redirect('/')
    }
  }

  if(isServer) {
    if (hasSession) {
      if(requiresAuth) {
        const serverToken = req.session.token
        const serverTokenType = req.session.tokenType
  
        if(!serverToken) {
          $axios.$post(`${req.session.hostName}/logout`)
          return redirect('/') // logout redirect
        }
        
        try {
          $axios.setHeader('Authorization', `${serverTokenType} ${serverToken}`)
          let data = await $axios.$get('/member/me')
        } catch(e) {
          console.log('[error]', e)
          return redirect('/')
        }
      }
    }
  }
}
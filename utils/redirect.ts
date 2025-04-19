export const redirectToLogin = () => {
    const origin = window.location.origin
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
    const loginUrl = `${origin}${basePath}/auth/login`
  
    console.info('[AutoFlex] Redirecting to:', loginUrl)
  
    window.location.href = loginUrl
  }
  
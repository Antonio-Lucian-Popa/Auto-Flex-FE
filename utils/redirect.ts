export const redirectToLogin = () => {
  const event = new CustomEvent('redirect-to-login');
  window.dispatchEvent(event);
};

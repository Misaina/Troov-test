export default function ({ route, redirect }) {
  const validRoutes = ['/home', '/signup', '/login'];

  if (!validRoutes.includes(route.path)) {
    return redirect('/home');
  }
}

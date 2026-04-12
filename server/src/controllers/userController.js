export function getProfile(request, response) {
  response.json({ user: request.user });
}

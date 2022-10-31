const isLocal = false;
const dbEndPoint = "https://aqueous-oasis-34234.herokuapp.com/";
const devEndPoint = "http://localhost:5050/";
const mainEndPoint = isLocal ? devEndPoint : dbEndPoint;
const apiEndPoints = {
  posts: `${mainEndPoint}posts`,
  authCheck: `${mainEndPoint}auth`,
  register: `${mainEndPoint}register`,
  login: `${mainEndPoint}login`,
  likes: `${mainEndPoint}likes`,
  server: `${mainEndPoint}`,
};

export default apiEndPoints;

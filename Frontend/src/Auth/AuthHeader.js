export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("AuthHeader "+user)
  if (user) {
    // console.log("Inside if of auth header");
    return {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${user}`,
    };
  } else {
    return {};
  }
}

const localPath = "http://localhost:1367/api";
const serverPath = "http://37.120.146.71:1367/api";
/* Address remote */
// export const RU = serverPath;
export const RU =
  process.env.NODE_ENV === "development" ? localPath : serverPath;

export const API_KEY = "AIzaSyDHrAOj672WWAVKh9bHho2Cbh5obIaNgOE";
export const DIRECTION_API_KEY = "AIzaSyCWN8u9CsZDhHZIh_r6quHh5C3pFrRFVXY";

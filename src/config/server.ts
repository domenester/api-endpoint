export default {
  token: {
    // 10 minutes
    expiresIn: 60 * 10
  },
  pathsToMulter: {
    avatar: "/uploadProfilePicture"
  },
  publicPath: [
    { path: "/login", method: ["POST"] }
  ],
  httpsKey: "/etc/letsencrypt/live/epicall.interaxa.com/privkey.pem",
  httpsCert: "/etc/letsencrypt/live/epicall.interaxa.com/cert.pem"
};

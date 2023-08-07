module.exports = {
  routes: [
    {
      method: "GET",
      path: "/random",
      handler: "content.randomPosts",
      config: {
        auth: false,
      },
    },
  ],
};

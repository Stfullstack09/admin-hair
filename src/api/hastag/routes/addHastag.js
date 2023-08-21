module.exports = {
  routes: [
    {
      method: "POST",
      path: "/add-hastag",
      handler: "hastag.AddHasTag",
      config: {
        auth: false,
      },
    },
  ],
};

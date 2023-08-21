module.exports = ({ env }) => ({
  // ...các cấu hình khác

  plugins: {
    // ...các plugin khác

    "content-manager": {
      defaultPublicationState: "published", // Thêm dòng này
      // ...các cấu hình khác cho plugin content-manager
    },
  },

  // ...các cấu hình khác
});

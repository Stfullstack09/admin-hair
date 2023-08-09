"use strict";

/**
 * content controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::content.content", ({ strapi }) => ({
  async randomPosts(ctx) {
    try {
      const { idCate } = ctx.query;

      //  id cate http://url?cate=id
      const allPosts = await strapi.entityService.findMany(
        "api::content.content",
        {
          filters: {
            categories: {
              id: idCate,
            },
          },
          limit: -1,
          ...ctx.query,
        }
      );

      let randomPosts = null;

      if (allPosts) {
        randomPosts = allPosts[Math.floor(Math.random() * allPosts.length)];
      }

      ctx.body = {
        errCode: "Thanh Cong",
        data: randomPosts,
      };
    } catch (error) {
      console.error(error);
      ctx.body = error;
    }
  },
}));

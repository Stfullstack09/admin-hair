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
          ...ctx.query,
        }
      );
      const randomPosts = shuffleArray(allPosts).slice(0, 10);

      const { pagination } = allPosts;

      ctx.body = {
        errCode: "Thanh Cong",
        data: randomPosts,
        pagination,
      };
    } catch (error) {
      console.error(error);
      ctx.body = error;
    }
  },
}));

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex,
    temporaryValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

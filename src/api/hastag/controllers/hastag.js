"use strict";

/**
 * hastag controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::hastag.hastag", ({ strapi }) => ({
  async AddHasTag(ctx) {
    try {
      if (!ctx?.request?.body?.cate || !ctx?.request?.body?.hastag) {
        ctx.body = {
          errCode: "Thất Bại",
          msg: "Bạn phải truyền lên đúng dữ liệu quy định!",
        };
        return;
      }

      let idCate = ctx?.request?.body?.cate?.split(" ");
      const Hastag = ctx?.request?.body?.hastag?.split(" ");

      //  id cate http://url?cate=id
      const allHastag = await strapi.db.query("api::hastag.hastag").findMany({
        where: {
          tag: {
            $in: Hastag,
          },
        },
        populate: ["categories"],
      });

      const DataUpdateMany = allHastag.map((item) => {
        let categories = item.categories.map((itemChild) => itemChild.id);
        categories = [...categories, ...idCate];
        let LocCate = [];
        for (let i = 0; i < categories.length; i++) {
          if (LocCate.indexOf(Number(categories[i])) === -1) {
            LocCate.push(Number(categories[i]));
          }
        }

        item.categories = LocCate;
        return item;
      });

      for (const item of DataUpdateMany) {
        try {
          await strapi.db.query("api::hastag.hastag").update({
            where: { id: item.id },
            data: {
              categories: item.categories,
            },
          });
        } catch (error) {
          console.error(
            `Error updating item with ID ${item.id}: ${error.message}`
          );
        }
      }

      let TagDifferent = Hastag.filter(
        (item) => !allHastag.find((itemChild) => item === itemChild.tag)
      );

      TagDifferent = TagDifferent.map((item) => {
        let Obj = {};
        Obj.tag = item;
        idCate = idCate.map((item) => Number(item));
        Obj.categories = idCate;
        return Obj;
      });

      for (let item of TagDifferent) {
        try {
          const createdItem = await strapi.db
            .query("api::hastag.hastag")
            .create({
              data: item,
            });

          // Tự động public bản ghi sau khi tạo mới
          await strapi.db.query("api::hastag.hastag").update({
            where: { id: createdItem.id },
            data: {
              publishedAt: new Date(),
            },
          });
        } catch (error) {
          console.error(`Error creating item: ${error.message}`);
        }
      }

      ctx.body = {
        errCode: "Thanh Cong",
        data: allHastag,
      };
    } catch (error) {
      console.error(error);
      ctx.body = error;
    }
  },
}));

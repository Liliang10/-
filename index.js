export default {
  async fetch(request, env, ctx) {
    return ctx.assets.fetch(request);
  },
};
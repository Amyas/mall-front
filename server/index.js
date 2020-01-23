const fs = require("fs");
const path = require("path");
const Koa = require("koa");
const Router = require("koa-router");
const { createBundleRenderer } = require("vue-server-renderer");

const app = new Koa();
const router = new Router();

const resolve = file => path.resolve(__dirname, "../", file);

app.use(require("koa-static")(resolve("dist")));

const template = fs.readFileSync(resolve("src/index.template.html"), "utf-8");
const serverBundle = require(resolve("dist/vue-ssr-server-bundle.json"));
const clientManifest = require(resolve("dist/vue-ssr-client-manifest.json"));

const renderer = createBundleRenderer(serverBundle, {
  template,
  clientManifest
});

router.get("*", async ctx => {
  try {
    const html = await renderer.renderToString(ctx);
    ctx.body = html;
  } catch (error) {
    ctx.body = error;
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log("server started at http://127.0.0.1:3000");
});

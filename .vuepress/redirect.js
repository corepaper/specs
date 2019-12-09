const path = require("path")
const fs = require("fs-extra")
const Mustache = require("mustache")

const redirectTemplate = fs.readFileSync(path.resolve(__dirname, 'redirect.html'), "utf8")
const specs = require("../specs.json")

let redirectPages = []
for (const spec of specs) {
  const content = Mustache.render(
    redirectTemplate, spec
  );

  redirectPages.push({
    path: spec.id + "/index.html",
    content,
  });
  redirectPages.push({
    path: spec.id.toLowerCase() + "/index.html",
    content,
  });
}

module.exports = (options, ctx) => ({
  name: "redirect",
  async generated (pagePaths) {
    const { outDir } = ctx

    for (const page of redirectPages) {
      const pagePath = path.resolve(outDir, page.path);
      await fs.outputFile(pagePath, page.content);
    }
  }
})

const path = require("path")
const fs = require("fs-extra")
const Mustache = require("mustache")

const redirectTemplate = fs.readFileSync(path.resolve(__dirname, 'redirect.html'), "utf8")
const specs = require("../specs.json")

let redirectPages = []
for (const spec of specs) {
  const content = Mustache.render(
    redirectTemplate, {
      title: spec.id,
      description: spec.description,
      url: spec.url,
    }
  );
  const discussContent = Mustache.render(
    redirectTemplate, {
      title: "Discussion: " + spec.id,
      description: spec.description,
      url: spec.discussUrl,
    }
  );

  redirectPages.push({
    path: spec.id + "/index.html",
    content,
  });
  redirectPages.push({
    path: spec.id + "/discuss/index.html",
    content: discussContent,
  });
  redirectPages.push({
    path: spec.id.toLowerCase() + "/index.html",
    content,
  });
  redirectPages.push({
    path: spec.id.toLowerCase() + "/discuss/index.html",
    content: discussContent,
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

const path = require("path")
const fs = require("fs-extra")

const specs = require("../specs.json");

const redirects = specs.map(v => {
  return "/" + v.id + " " + v.url + " " + "302" + "\n" +
    "/" + v.id.toLowerCase() + " " + v.url + " " + "302"
}).join("\n");

module.exports = (options, ctx) => ({
  async generated (pagePaths) {
    const { pages, outDir } = ctx

    const redirectPagePath = path.resolve(outDir, "_redirects")
    await fs.outputFile(redirectPagePath, redirects)
  }
})

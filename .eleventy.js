module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  // Strip HTML tags and count words
  eleventyConfig.addFilter("wordCount", (content) => {
    const text = (content || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    return text ? text.split(" ").length : 0;
  });

  // Newline to <br> for heroLeft/heroRight frontmatter
  eleventyConfig.addFilter("nl2br", (str) => {
    return (str || "").replace(/\n/g, "<br>");
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

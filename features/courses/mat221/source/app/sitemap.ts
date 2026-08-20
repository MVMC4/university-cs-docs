import type { MetadataRoute } from "next";
import { TOPICS } from "../lib";
import { SITE_URL } from "../lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed = ["", "/formula-sheet", "/resources"].map(function (path) {
    return { url: SITE_URL + path, lastModified: now, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.7 };
  });
  const topicRoutes = TOPICS.flatMap(function (topic) {
    return ["", "/questions", "/quiz", "/review", "/exam-practice"].map(function (suffix) {
      return { url: SITE_URL + "/topics/" + topic.slug + suffix, lastModified: now, changeFrequency: "weekly" as const, priority: suffix === "" ? 0.8 : 0.6 };
    });
  });
  return fixed.concat(topicRoutes);
}

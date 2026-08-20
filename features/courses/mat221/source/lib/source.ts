import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";
import { map } from "../.map";

export const source = loader({
  baseUrl: "/topics",
  source: createMDXSource(map)
});

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

// Las variables se cargan desde studio/.env.local (copiado por "npm run studio" desde la raíz)
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "enblanco-studio",
  title: "enblanco Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Projects")
              .child(
                S.documentList()
                  .title("Projects")
                  .filter('_type == "project"')
                  .defaultOrdering([{ field: "order", direction: "asc" }, { field: "_createdAt", direction: "desc" }])
              ),
            S.listItem()
              .title("Notes")
              .child(
                S.documentList()
                  .title("Notes")
                  .filter('_type == "note"')
                  .defaultOrdering([
                    { field: "publishedAt", direction: "desc" },
                    { field: "_createdAt", direction: "desc" },
                  ])
              ),
            ...S.documentTypeListItems().filter((item) => !["project", "note"].includes(item.getId() ?? "")),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});

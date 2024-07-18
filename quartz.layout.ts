import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

import { Options } from "./quartz/components/ExplorerNode"

const defaultOptions = {
  title: "목록",
  folderClickBehavior:"link",
  sortFn: (a, b) => {
    if(a.sortOrder > b.sortOrder) {
      return 1
    } else if(a.sortOrder < b.sortOrder) {
      return -1
    } else {
      // Sort order: folders first, then files. Sort folders and files alphabetically
      if ((!a.file && !b.file) || (a.file && b.file)) {
        // numeric: true: Whether numeric collation should be used, such that "1" < "2" < "10"
        // sensitivity: "base": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A
        return a.displayName.localeCompare(b.displayName, undefined, {
          numeric: true,
          sensitivity: "base",
        })
        
      }
      
      if (a.file && !b.file) {
        return 1
      } else {
        return -1
      }
    }
  },
} satisfies Partial<Options>

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({...defaultOptions})),
  ],
  right: [
    Component.Graph(),
    Component.TableOfContents(),
    Component.Backlinks(),
    Component.RecentNotes(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = defaultContentPageLayout

import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Registry } from "fuma-cli/compiler";

const dir = path.dirname(fileURLToPath(import.meta.url));

export const registry: Registry = {
  name: "espresso-ui",
  dir,
  tsconfigPath: "./tsconfig.json",
  packageJson: "./package.json",
  components: [
    {
      name: "theme",
      files: [{ type: "css", path: "app/globals.css", target: "<dir>/globals.css" }],
    },
    {
      name: "alert",
      files: [{ type: "ui", path: "components/ui/alert.tsx" }],
    },
    {
      name: "avatar",
      files: [{ type: "ui", path: "components/ui/avatar.tsx" }],
    },
    {
      name: "badge",
      files: [{ type: "ui", path: "components/ui/badge.tsx" }],
    },
    {
      name: "breadcrumb",
      files: [{ type: "ui", path: "components/ui/breadcrumb.tsx" }],
    },
    {
      name: "button",
      files: [{ type: "ui", path: "components/ui/button.tsx" }],
    },
    {
      name: "button-group",
      files: [{ type: "ui", path: "components/ui/button-group.tsx" }],
    },
    {
      name: "calendar",
      files: [{ type: "ui", path: "components/ui/calendar.tsx" }],
    },
    {
      name: "checkbox",
      files: [{ type: "ui", path: "components/ui/checkbox.tsx" }],
    },
    {
      name: "dialog",
      files: [{ type: "ui", path: "components/ui/dialog.tsx" }],
    },
    {
      name: "dropdown-menu",
      files: [{ type: "ui", path: "components/ui/dropdown-menu.tsx" }],
    },
    {
      name: "field",
      files: [{ type: "ui", path: "components/ui/field.tsx" }],
    },
    {
      name: "header",
      files: [{ type: "ui", path: "components/ui/header.tsx" }],
    },
    {
      name: "input",
      files: [{ type: "ui", path: "components/ui/input.tsx" }],
    },
    {
      name: "input-group",
      files: [{ type: "ui", path: "components/ui/input-group.tsx" }],
    },
    {
      name: "item",
      files: [{ type: "ui", path: "components/ui/item.tsx" }],
    },
    {
      name: "kbd",
      files: [{ type: "ui", path: "components/ui/kbd.tsx" }],
    },
    {
      name: "label",
      files: [{ type: "ui", path: "components/ui/label.tsx" }],
    },
    {
      name: "notification",
      files: [{ type: "ui", path: "components/ui/notification.tsx" }],
    },
    {
      name: "popover",
      files: [{ type: "ui", path: "components/ui/popover.tsx" }],
    },
    {
      name: "progress",
      files: [{ type: "ui", path: "components/ui/progress.tsx" }],
    },
    {
      name: "radio-group",
      files: [{ type: "ui", path: "components/ui/radio-group.tsx" }],
    },
    {
      name: "rating",
      files: [{ type: "ui", path: "components/ui/rating.tsx" }],
    },
    {
      name: "select",
      files: [{ type: "ui", path: "components/ui/select.tsx" }],
    },
    {
      name: "separator",
      files: [{ type: "ui", path: "components/ui/separator.tsx" }],
    },
    {
      name: "sheet",
      files: [{ type: "ui", path: "components/ui/sheet.tsx" }],
    },
    {
      name: "skeleton",
      files: [{ type: "ui", path: "components/ui/skeleton.tsx" }],
    },
    {
      name: "slider",
      files: [{ type: "ui", path: "components/ui/slider.tsx" }],
    },
    {
      name: "sonner",
      files: [{ type: "ui", path: "components/ui/sonner.tsx" }],
    },
    {
      name: "spinner",
      files: [{ type: "ui", path: "components/ui/spinner.tsx" }],
    },
    {
      name: "switch",
      files: [{ type: "ui", path: "components/ui/switch.tsx" }],
    },
    {
      name: "table",
      files: [{ type: "ui", path: "components/ui/table.tsx" }],
    },
    {
      name: "tabs",
      files: [{ type: "ui", path: "components/ui/tabs.tsx" }],
    },
    {
      name: "tag",
      files: [{ type: "ui", path: "components/ui/tag.tsx" }],
    },
    {
      name: "textarea",
      files: [{ type: "ui", path: "components/ui/textarea.tsx" }],
    },
    {
      name: "tooltip",
      files: [{ type: "ui", path: "components/ui/tooltip.tsx" }],
    },
  ],
};

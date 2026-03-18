import { Moon } from "lucide-react"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

const avatarSrc = "https://github.com/shadcn.png"

const sizes = ["xs", "sm", "default", "lg", "xl", "2xl", "3xl"] as const

export default function AvatarPage() {
  return (
    <div className="flex flex-col gap-12 p-10">
      {/* With Image */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Image</SectionTitle>
        <div className="flex flex-wrap items-end gap-4">
          {sizes.map((size) => (
            <Avatar key={size} size={size}>
              <AvatarImage src={avatarSrc} alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>

      {/* Fallback */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Fallback</SectionTitle>
        <div className="flex flex-wrap items-end gap-4">
          {sizes.map((size) => (
            <Avatar key={size} size={size}>
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>

      {/* With Badge */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Badge</SectionTitle>
        <div className="flex flex-wrap items-end gap-4">
          {sizes.map((size) => (
            <Avatar key={size} size={size}>
              <AvatarImage src={avatarSrc} alt="User" />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
          ))}
        </div>
      </div>

      {/* Badge with Icon */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Badge with Icon</SectionTitle>
        <div className="flex flex-wrap items-end gap-4">
          {sizes.map((size) => (
            <Avatar key={size} size={size}>
              <AvatarImage src={avatarSrc} alt="User" />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge className="bg-blue-500">
                <Moon className="fill-white text-white" />
              </AvatarBadge>
            </Avatar>
          ))}
        </div>
      </div>

      {/* Fallback with Badge */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Fallback with Badge</SectionTitle>
        <div className="flex flex-wrap items-end gap-4">
          {sizes.map((size) => (
            <Avatar key={size} size={size}>
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
          ))}
        </div>
      </div>

      {/* Avatar Group */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Avatar Group</SectionTitle>
        <div className="flex flex-col gap-6">
          {sizes.map((size) => (
            <AvatarGroup key={size}>
              <Avatar size={size}>
                <AvatarImage src={avatarSrc} alt="User" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <Avatar size={size}>
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <Avatar size={size}>
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>3</AvatarGroupCount>
            </AvatarGroup>
          ))}
        </div>
      </div>

      {/* Squared — With Image */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Squared — With Image</SectionTitle>
        <div className="flex flex-wrap items-end gap-4">
          {sizes.map((size) => (
            <Avatar key={size} size={size} squared>
              <AvatarImage src={avatarSrc} alt="User" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>

      {/* Squared — Fallback */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Squared — Fallback</SectionTitle>
        <div className="flex flex-wrap items-end gap-4">
          {sizes.map((size) => (
            <Avatar key={size} size={size} squared>
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>

      {/* Squared — With Badge */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Squared — With Badge</SectionTitle>
        <div className="flex flex-wrap items-end gap-4">
          {sizes.map((size) => (
            <Avatar key={size} size={size} squared>
              <AvatarImage src={avatarSrc} alt="User" />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
          ))}
        </div>
      </div>

      {/* All Size x Variant Combinations */}
      <div className="flex flex-col gap-4">
        <SectionTitle>All Sizes</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Type
                </th>
                {sizes.map((size) => (
                  <th
                    key={size}
                    className="px-4 py-2 text-left text-xs font-medium text-muted-foreground"
                  >
                    {size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Image
                </td>
                {sizes.map((size) => (
                  <td key={size} className="px-4 py-3">
                    <Avatar size={size}>
                      <AvatarImage src={avatarSrc} alt="User" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Fallback
                </td>
                {sizes.map((size) => (
                  <td key={size} className="px-4 py-3">
                    <Avatar size={size}>
                      <AvatarFallback>N</AvatarFallback>
                    </Avatar>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  With Badge
                </td>
                {sizes.map((size) => (
                  <td key={size} className="px-4 py-3">
                    <Avatar size={size}>
                      <AvatarImage src={avatarSrc} alt="User" />
                      <AvatarFallback>CN</AvatarFallback>
                      <AvatarBadge />
                    </Avatar>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Squared
                </td>
                {sizes.map((size) => (
                  <td key={size} className="px-4 py-3">
                    <Avatar size={size} squared>
                      <AvatarImage src={avatarSrc} alt="User" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Squared + Badge
                </td>
                {sizes.map((size) => (
                  <td key={size} className="px-4 py-3">
                    <Avatar size={size} squared>
                      <AvatarImage src={avatarSrc} alt="User" />
                      <AvatarFallback>CN</AvatarFallback>
                      <AvatarBadge />
                    </Avatar>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

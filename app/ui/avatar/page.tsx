import { Check } from "lucide-react"
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

export default function AvatarPage() {
  return (
    <div className="flex flex-col gap-12 p-10">
      {/* With Image */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Image</SectionTitle>
        <div className="flex flex-wrap items-end gap-4">
          <Avatar size="sm">
            <AvatarImage src={avatarSrc} alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarImage src={avatarSrc} alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src={avatarSrc} alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Fallback */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Fallback</SectionTitle>
        <div className="flex flex-wrap items-end gap-4">
          <Avatar size="sm">
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* With Badge */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Badge</SectionTitle>
        <div className="flex flex-wrap items-end gap-4">
          <Avatar size="sm">
            <AvatarImage src={avatarSrc} alt="User" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge />
          </Avatar>
          <Avatar size="default">
            <AvatarImage src={avatarSrc} alt="User" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge />
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src={avatarSrc} alt="User" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge />
          </Avatar>
        </div>
      </div>

      {/* Badge with Icon */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Badge with Icon</SectionTitle>
        <div className="flex flex-wrap items-end gap-4">
          <Avatar size="default">
            <AvatarImage src={avatarSrc} alt="User" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge>
              <Check />
            </AvatarBadge>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src={avatarSrc} alt="User" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge>
              <Check />
            </AvatarBadge>
          </Avatar>
        </div>
      </div>

      {/* Fallback with Badge */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Fallback with Badge</SectionTitle>
        <div className="flex flex-wrap items-end gap-4">
          <Avatar size="sm">
            <AvatarFallback>A</AvatarFallback>
            <AvatarBadge />
          </Avatar>
          <Avatar size="default">
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge />
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>JD</AvatarFallback>
            <AvatarBadge />
          </Avatar>
        </div>
      </div>

      {/* Avatar Group */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Avatar Group</SectionTitle>
        <div className="flex flex-col gap-6">
          <AvatarGroup>
            <Avatar size="sm">
              <AvatarImage src={avatarSrc} alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>

          <AvatarGroup>
            <Avatar size="default">
              <AvatarImage src={avatarSrc} alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="default">
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar size="default">
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <Avatar size="default">
              <AvatarFallback>EF</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+5</AvatarGroupCount>
          </AvatarGroup>

          <AvatarGroup>
            <Avatar size="lg">
              <AvatarImage src={avatarSrc} alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+2</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </div>

      {/* All Size x Variant Combinations */}
      <div className="flex flex-col gap-4">
        <SectionTitle>All Sizes</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">sm</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">default</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">lg</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Image</td>
                <td className="px-4 py-3">
                  <Avatar size="sm"><AvatarImage src={avatarSrc} alt="User" /><AvatarFallback>CN</AvatarFallback></Avatar>
                </td>
                <td className="px-4 py-3">
                  <Avatar size="default"><AvatarImage src={avatarSrc} alt="User" /><AvatarFallback>CN</AvatarFallback></Avatar>
                </td>
                <td className="px-4 py-3">
                  <Avatar size="lg"><AvatarImage src={avatarSrc} alt="User" /><AvatarFallback>CN</AvatarFallback></Avatar>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">Fallback</td>
                <td className="px-4 py-3">
                  <Avatar size="sm"><AvatarFallback>A</AvatarFallback></Avatar>
                </td>
                <td className="px-4 py-3">
                  <Avatar size="default"><AvatarFallback>CN</AvatarFallback></Avatar>
                </td>
                <td className="px-4 py-3">
                  <Avatar size="lg"><AvatarFallback>JD</AvatarFallback></Avatar>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-xs text-muted-foreground">With Badge</td>
                <td className="px-4 py-3">
                  <Avatar size="sm"><AvatarImage src={avatarSrc} alt="User" /><AvatarFallback>CN</AvatarFallback><AvatarBadge /></Avatar>
                </td>
                <td className="px-4 py-3">
                  <Avatar size="default"><AvatarImage src={avatarSrc} alt="User" /><AvatarFallback>CN</AvatarFallback><AvatarBadge /></Avatar>
                </td>
                <td className="px-4 py-3">
                  <Avatar size="lg"><AvatarImage src={avatarSrc} alt="User" /><AvatarFallback>CN</AvatarFallback><AvatarBadge /></Avatar>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

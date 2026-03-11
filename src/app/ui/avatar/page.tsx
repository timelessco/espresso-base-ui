import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";

export default function AvatarPage() {
  return (
    <div className="space-y-12 p-10">
      <div className="grid grid-cols-2 gap-x-12 gap-y-10">
        {/* Circular — Image */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Circular — Image</h2>
          <div className="flex items-end gap-4">
            <Avatar size="xs">
              <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="md">
              <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="xl">
              <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="2xl">
              <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="3xl">
              <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
          </div>
        </section>

        {/* Square — Image */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Square — Image</h2>
          <div className="flex items-end gap-4">
            <Avatar size="xs" circular={false}>
              <AvatarImage
                circular={false}
                src="https://i.pravatar.cc/150?img=2"
                alt="User"
              />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="sm" circular={false}>
              <AvatarImage
                circular={false}
                src="https://i.pravatar.cc/150?img=2"
                alt="User"
              />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="md" circular={false}>
              <AvatarImage
                circular={false}
                src="https://i.pravatar.cc/150?img=2"
                alt="User"
              />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="lg" circular={false}>
              <AvatarImage
                circular={false}
                src="https://i.pravatar.cc/150?img=2"
                alt="User"
              />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="xl" circular={false}>
              <AvatarImage
                circular={false}
                src="https://i.pravatar.cc/150?img=2"
                alt="User"
              />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="2xl" circular={false}>
              <AvatarImage
                circular={false}
                src="https://i.pravatar.cc/150?img=2"
                alt="User"
              />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="3xl" circular={false}>
              <AvatarImage
                circular={false}
                src="https://i.pravatar.cc/150?img=2"
                alt="User"
              />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
          </div>
        </section>

        {/* Circular — Fallback Text */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Circular — Fallback Text</h2>
          <div className="flex items-end gap-4">
            <Avatar size="xs">
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="md">
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="xl">
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="2xl">
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="3xl">
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
          </div>
        </section>

        {/* Square — Fallback Text */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Square — Fallback Text</h2>
          <div className="flex items-end gap-4">
            <Avatar size="xs" circular={false}>
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="sm" circular={false}>
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="md" circular={false}>
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="lg" circular={false}>
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="xl" circular={false}>
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="2xl" circular={false}>
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Avatar size="3xl" circular={false}>
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
          </div>
        </section>

        {/* Circular — Fallback Icon */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Circular — Fallback Icon</h2>
          <div className="flex items-end gap-4">
            <Avatar size="xs">
              <AvatarFallback />
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback />
            </Avatar>
            <Avatar size="md">
              <AvatarFallback />
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback />
            </Avatar>
            <Avatar size="xl">
              <AvatarFallback />
            </Avatar>
            <Avatar size="2xl">
              <AvatarFallback />
            </Avatar>
            <Avatar size="3xl">
              <AvatarFallback />
            </Avatar>
          </div>
        </section>

        {/* Square — Fallback Icon */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Square — Fallback Icon</h2>
          <div className="flex items-end gap-4">
            <Avatar size="xs" circular={false}>
              <AvatarFallback />
            </Avatar>
            <Avatar size="sm" circular={false}>
              <AvatarFallback />
            </Avatar>
            <Avatar size="md" circular={false}>
              <AvatarFallback />
            </Avatar>
            <Avatar size="lg" circular={false}>
              <AvatarFallback />
            </Avatar>
            <Avatar size="xl" circular={false}>
              <AvatarFallback />
            </Avatar>
            <Avatar size="2xl" circular={false}>
              <AvatarFallback />
            </Avatar>
            <Avatar size="3xl" circular={false}>
              <AvatarFallback />
            </Avatar>
          </div>
        </section>

        {/* Circular — Image + Badge */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Circular — Image + Badge</h2>
          <div className="flex items-end gap-4">
            <Avatar size="xs">
              <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User" />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="sm">
              <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User" />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="md">
              <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User" />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User" />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="xl">
              <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User" />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="2xl">
              <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User" />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="3xl">
              <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User" />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
          </div>
        </section>

        {/* Square — Image + Badge */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Square — Image + Badge</h2>
          <div className="flex items-end gap-4">
            <Avatar size="xs" circular={false}>
              <AvatarImage
                circular={false}
                src="https://i.pravatar.cc/150?img=8"
                alt="User"
              />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="sm" circular={false}>
              <AvatarImage
                circular={false}
                src="https://i.pravatar.cc/150?img=8"
                alt="User"
              />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="md" circular={false}>
              <AvatarImage
                circular={false}
                src="https://i.pravatar.cc/150?img=8"
                alt="User"
              />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="lg" circular={false}>
              <AvatarImage
                circular={false}
                src="https://i.pravatar.cc/150?img=8"
                alt="User"
              />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="xl" circular={false}>
              <AvatarImage
                circular={false}
                src="https://i.pravatar.cc/150?img=8"
                alt="User"
              />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="2xl" circular={false}>
              <AvatarImage
                circular={false}
                src="https://i.pravatar.cc/150?img=8"
                alt="User"
              />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="3xl" circular={false}>
              <AvatarImage
                circular={false}
                src="https://i.pravatar.cc/150?img=8"
                alt="User"
              />
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
          </div>
        </section>

        {/* Circular — Fallback Text + Badge */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">
            Circular — Fallback Text + Badge
          </h2>
          <div className="flex items-end gap-4">
            <Avatar size="xs">
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="md">
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="xl">
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="2xl">
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="3xl">
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
          </div>
        </section>

        {/* Square — Fallback Text + Badge */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">
            Square — Fallback Text + Badge
          </h2>
          <div className="flex items-end gap-4">
            <Avatar size="xs" circular={false}>
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="sm" circular={false}>
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="md" circular={false}>
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="lg" circular={false}>
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="xl" circular={false}>
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="2xl" circular={false}>
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="3xl" circular={false}>
              <AvatarFallback>N</AvatarFallback>
              <AvatarBadge />
            </Avatar>
          </div>
        </section>

        {/* Circular — Fallback Icon + Badge */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">
            Circular — Fallback Icon + Badge
          </h2>
          <div className="flex items-end gap-4">
            <Avatar size="xs">
              <AvatarFallback />
              <AvatarBadge />
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback />
              <AvatarBadge />
            </Avatar>
            <Avatar size="md">
              <AvatarFallback />
              <AvatarBadge />
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback />
              <AvatarBadge />
            </Avatar>
            <Avatar size="xl">
              <AvatarFallback />
              <AvatarBadge />
            </Avatar>
            <Avatar size="2xl">
              <AvatarFallback />
              <AvatarBadge />
            </Avatar>
            <Avatar size="3xl">
              <AvatarFallback />
              <AvatarBadge />
            </Avatar>
          </div>
        </section>

        {/* Square — Fallback Icon + Badge */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">
            Square — Fallback Icon + Badge
          </h2>
          <div className="flex items-end gap-4">
            <Avatar size="xs" circular={false}>
              <AvatarFallback />
              <AvatarBadge />
            </Avatar>
            <Avatar size="sm" circular={false}>
              <AvatarFallback />
              <AvatarBadge />
            </Avatar>
            <Avatar size="md" circular={false}>
              <AvatarFallback />
              <AvatarBadge />
            </Avatar>
            <Avatar size="lg" circular={false}>
              <AvatarFallback />
              <AvatarBadge />
            </Avatar>
            <Avatar size="xl" circular={false}>
              <AvatarFallback />
              <AvatarBadge />
            </Avatar>
            <Avatar size="2xl" circular={false}>
              <AvatarFallback />
              <AvatarBadge />
            </Avatar>
            <Avatar size="3xl" circular={false}>
              <AvatarFallback />
              <AvatarBadge />
            </Avatar>
          </div>
        </section>
      </div>

      {/* Avatar Group */}
      {/* <section className="space-y-4">
        <h2 className="text-lg font-semibold">Avatar Group</h2>
        <AvatarGroup>
          <Avatar size="md">
            <AvatarImage src="https://i.pravatar.cc/150?img=4" alt="User" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <Avatar size="md">
            <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="User" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <Avatar size="md">
            <AvatarImage src="https://i.pravatar.cc/150?img=6" alt="User" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <Avatar size="md">
            <AvatarImage src="https://i.pravatar.cc/150?img=7" alt="User" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
      </section> */}
    </div>
  );
}

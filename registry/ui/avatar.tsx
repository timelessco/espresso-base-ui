"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { User } from "lucide-react";

import { cn } from "@/lib/utils";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

function Avatar({
  className,
  size = "md",
  circular = true,
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: AvatarSize;
  circular?: boolean;
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-circular={circular}
      className={cn(
        "group/avatar relative flex shrink-0 select-none after:absolute after:inset-0 after:mix-blend-darken dark:after:mix-blend-lighten",
        circular
          ? "rounded-full after:rounded-full"
          : [
              "data-[size=xs]:rounded-xs data-[size=xs]:after:rounded-xs",
              "data-[size=sm]:rounded-sm data-[size=sm]:after:rounded-sm",
              "data-[size=md]:rounded-sm data-[size=md]:after:rounded-sm",
              "data-[size=lg]:rounded-md data-[size=lg]:after:rounded-md",
              "data-[size=xl]:rounded-md data-[size=xl]:after:rounded-md",
              "data-[size=2xl]:rounded-lg data-[size=2xl]:after:rounded-lg",
              "data-[size=3xl]:rounded-xl data-[size=3xl]:after:rounded-xl",
            ],
        "data-[size=xs]:size-4",
        "data-[size=sm]:size-5",
        "data-[size=md]:size-6",
        "data-[size=lg]:size-7",
        "data-[size=xl]:size-8",
        "data-[size=2xl]:size-10",
        "data-[size=3xl]:size-[46px]",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  circular = true,
  ...props
}: AvatarPrimitive.Image.Props & {
  circular?: boolean;
}) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full object-cover",
        circular ? "rounded-full" : "rounded-[inherit]",
        className,
      )}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  children,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "tracking-6 flex size-full items-center justify-center rounded-[inherit] bg-[var(--secondary)] text-[var(--accent-foreground)]",
        "group-data-[size=xs]/avatar:text-2xs data-[size=xs]:text-2xs group-data-[size=xs]/avatar:leading-tight group-data-[size=xs]/avatar:font-medium data-[size=xs]:leading-tight data-[size=xs]:font-medium",
        "group-data-[size=sm]/avatar:text-sm group-data-[size=sm]/avatar:leading-tight group-data-[size=sm]/avatar:font-medium data-[size=sm]:text-sm data-[size=sm]:leading-tight data-[size=sm]:font-medium",
        "group-data-[size=md]/avatar:text-base group-data-[size=md]/avatar:leading-tight group-data-[size=md]/avatar:font-medium data-[size=md]:text-base data-[size=md]:leading-tight data-[size=md]:font-medium",
        "group-data-[size=lg]/avatar:text-base group-data-[size=lg]/avatar:leading-tight group-data-[size=lg]/avatar:font-medium data-[size=lg]:text-base data-[size=lg]:leading-tight data-[size=lg]:font-medium",
        "group-data-[size=xl]/avatar:text-lg group-data-[size=xl]/avatar:leading-tight group-data-[size=xl]/avatar:font-medium data-[size=xl]:text-lg data-[size=xl]:leading-tight data-[size=xl]:font-medium",
        "group-data-[size=2xl]/avatar:text-xl group-data-[size=2xl]/avatar:leading-tight group-data-[size=2xl]/avatar:font-medium data-[size=2xl]:text-xl data-[size=2xl]:leading-tight data-[size=2xl]:font-medium",
        "group-data-[size=3xl]/avatar:text-2xl group-data-[size=3xl]/avatar:leading-tight group-data-[size=3xl]/avatar:font-medium data-[size=3xl]:text-2xl data-[size=3xl]:leading-tight data-[size=3xl]:font-medium",
        className,
      )}
      {...props}
    >
      {children ?? <User className="size-1/2" />}
    </AvatarPrimitive.Fallback>
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "ring-background absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-[var(--color-light-green-700)] text-white ring-2 select-none",
        "group-data-[size=xs]/avatar:size-1 group-data-[size=xs]/avatar:[&>svg]:hidden",
        "group-data-[size=sm]/avatar:size-[5px] group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=md]/avatar:size-[7px] group-data-[size=md]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-2 group-data-[size=lg]/avatar:[&>svg]:size-2",
        "group-data-[size=xl]/avatar:size-2 group-data-[size=xl]/avatar:[&>svg]:size-2.5",
        "group-data-[size=2xl]/avatar:size-2.5 group-data-[size=2xl]/avatar:[&>svg]:size-3",
        "group-data-[size=3xl]/avatar:size-3 group-data-[size=3xl]/avatar:[&>svg]:size-3",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group *:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "bg-muted text-muted-foreground ring-background relative flex shrink-0 items-center justify-center rounded-full text-sm ring-2",
        "group-has-data-[size=xs]/avatar-group:size-6",
        "group-has-data-[size=sm]/avatar-group:size-7",
        "group-has-data-[size=md]/avatar-group:size-8",
        "group-has-data-[size=lg]/avatar-group:size-10",
        "group-has-data-[size=xl]/avatar-group:size-12",
        "group-has-data-[size=2xl]/avatar-group:size-14",
        "group-has-data-[size=3xl]/avatar-group:size-16",
        "[&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
};

import React from "react";

// Shared Tailwind CSS classes
const primaryCardClasses =
  "max-w-xs px-4 py-2 rounded-lg bg-primary text-primary-foreground";
const avatarClasses = "h-8 w-8 rounded-full";

export function MessageRequest({text}) {
  return (
    <div className="flex items-end justify-end space-x-2 mt-4">
      <div className={primaryCardClasses}>
        <p className="text-sm">{text}</p>
      </div>
      <img
        aria-hidden="true"
        alt="user-avatar"
        src="https://placehold.co/30?text=User"
        className={avatarClasses}
      />
    </div>
  );
}

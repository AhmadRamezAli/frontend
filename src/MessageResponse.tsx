import React from "react";

const primaryCardClasses =
  "max-w-md bg-primary text-primary-foreground p-4 rounded-lg py-2";
const iconClasses = "h-8 w-8 rounded-full";

export function MessageResponse({text}) {
  return (
    <div className="flex items-end  space-x-2 mt-4">
      <img
        aria-hidden="true"
        alt="user-avatar"
        src="https://placehold.co/30?text=AI"
        className={iconClasses}
      />
      <div className={primaryCardClasses}>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}

import React from "react";

export function UploadFile({ text }) {
  return (
    <div className="{primaryCardClasses}">

      <label
        for="file-upload"
        class="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-lg mt-4"
      >
        {" "}
        Upload File{" "}
      </label>
      <input id="file-upload" type="file" class="hidden"  />
    </div>
  );
}

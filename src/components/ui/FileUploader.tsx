import React, { useEffect } from 'react';

export function FileUploader({ setFiles, setFileList }) {

  useEffect(() => {
    const handleFilesChange = (e) => {
      const newFiles = e.target.files;
      setFiles(newFiles);

      const newFileNames = Array.from(newFiles).map(file => file.name);
      setFileList(newFileNames);
    };

    const filesInput = document.getElementById('files');
    filesInput.addEventListener('change', handleFilesChange);

    return () => {
      filesInput.removeEventListener('change', handleFilesChange);
    };
  }, [setFiles, setFileList]);

  return (
    <div className="flex flex-col item-center">
      <input type="file" id="files" multiple />
    </div>
  );
};

export default FileUploader;

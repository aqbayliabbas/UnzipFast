'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileIcon, Download, Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface FileItem {
  name: string;
  path: string;
  size: number;
}

export default function FileUploader() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file || !file.name.endsWith('.zip')) {
      alert('Please select a ZIP file');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      setFiles(data.files);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/zip': ['.zip'],
    },
    multiple: false
  });

  const handleDownload = async (filePath: string) => {
    try {
      const response = await fetch(`/api/download?path=${encodeURIComponent(filePath)}`);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filePath.split('/').pop() || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              ZIP File Explorer
            </h1>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Upload your ZIP files and easily explore their contents. Click to download individual files.
            </p>
          </div>

          {/* Upload Zone */}
          <div className="w-full max-w-3xl mx-auto">
            <div
              {...getRootProps()}
              className={clsx(
                "border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer",
                isDragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400",
                uploading && "pointer-events-none opacity-50"
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <Upload
                  className={clsx(
                    "w-12 h-12 transition-colors",
                    isDragActive ? "text-blue-500" : "text-gray-400"
                  )}
                />
                {isDragActive ? (
                  <p className="text-lg font-medium text-blue-500">
                    Drop your ZIP file here
                  </p>
                ) : (
                  <p className="text-lg font-medium text-gray-500">
                    Drag & drop your ZIP file here, or click to select
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Upload Status */}
          {uploading && (
            <div className="flex items-center justify-center gap-2 text-blue-600 animate-in fade-in">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Uploading and extracting files...</span>
            </div>
          )}

          {/* File List */}
          {files.length > 0 && (
            <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="font-semibold text-gray-900">
                    Extracted Files ({files.length})
                  </h2>
                </div>
                <ul className="divide-y divide-gray-200">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <FileIcon className="w-8 h-8 text-blue-500 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-500">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload(file.path)}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

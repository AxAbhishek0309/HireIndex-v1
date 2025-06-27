import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Upload, File, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  isLoading?: boolean;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileSelected, 
  isLoading = false,
  error
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileName(file.name);
      onFileSelected(file);
    }
  }, [onFileSelected]);

  const { 
    getRootProps, 
    getInputProps, 
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
    maxFiles: 1,
    disabled: isLoading
  });

  const getBorderColor = () => {
    if (isDragAccept) return 'border-green-500';
    if (isDragReject) return 'border-red-500';
    if (isDragActive) return 'border-blue-500';
    return 'border-gray-300';
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div 
          {...getRootProps()} 
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer
            ${getBorderColor()}
            ${isDragActive ? 'bg-blue-50' : 'bg-white'}
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center">
            {fileName ? (
              <div className="flex items-center mb-4">
                <File className="h-8 w-8 text-blue-500 mr-2" />
                <span className="text-lg font-medium text-gray-700">{fileName}</span>
              </div>
            ) : (
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
            )}
            
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {fileName ? 'Change Resume File' : 'Upload Your Resume'}
            </h3>
            
            {!fileName && (
              <p className="text-gray-500 mb-4">
                Drag and drop your resume file or click to browse
              </p>
            )}
            
            <p className="text-sm text-gray-400 mb-6">
              Supported formats: PDF, DOCX
            </p>
            
            <Button 
              type="button" 
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {fileName ? 'Select Another File' : 'Browse Files'}
            </Button>
            
            {error && (
              <div className="flex items-center mt-4 text-red-500">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            <p className="text-xs text-gray-400 mt-4">
              Your files are securely processed and not stored on our servers.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

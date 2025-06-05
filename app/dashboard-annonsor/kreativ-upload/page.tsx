'use client';

import { motion } from 'framer-motion';
import { ArrowUpTrayIcon, DocumentIcon, CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useState, useCallback } from 'react';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: 'uploading' | 'validating' | 'approved' | 'rejected';
  message?: string;
  preview?: string;
}

export default function KreativUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: formatFileSize(file.size),
      status: 'uploading' as const,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload and validation process
    newFiles.forEach((file, index) => {
      setTimeout(() => {
        setUploadedFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'validating' as const } : f
        ));
      }, 1000 + index * 500);

      setTimeout(() => {
        const isApproved = Math.random() > 0.3;
        setUploadedFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { 
                ...f, 
                status: isApproved ? 'approved' : 'rejected',
                message: isApproved 
                  ? 'Filen uppfyller alla krav' 
                  : 'Upplösningen är för låg (minst 1920x1080 krävs)'
              } 
            : f
        ));
      }, 2500 + index * 500);
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const specifications = [
    { label: 'Format', value: 'JPG, PNG, MP4' },
    { label: 'Upplösning', value: 'Min. 1920x1080' },
    { label: 'Filstorlek', value: 'Max 50 MB' },
    { label: 'Bildförhållande', value: '16:9 eller 9:16' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">Kreativ-upload & validering</h1>
        <p className="text-gray-600 mt-2">Ladda upp och validera ditt kampanjmaterial</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {/* Drag & Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200
                ${isDragging 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
            >
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <ArrowUpTrayIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Dra och släpp filer här
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                eller klicka för att välja filer
              </p>
              <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-medium shadow hover:shadow-lg transition-all duration-200">
                Välj filer
              </button>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-8 space-y-4">
                <h3 className="font-semibold text-gray-900">Uppladdade filer</h3>
                {uploadedFiles.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <DocumentIcon className="w-8 h-8 text-gray-400" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{file.size}</p>
                      {file.message && (
                        <p className={`text-sm mt-1 ${
                          file.status === 'approved' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {file.message}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === 'uploading' && (
                        <div className="flex items-center gap-2 text-blue-600">
                          <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full" />
                          <span className="text-sm">Laddar upp...</span>
                        </div>
                      )}
                      {file.status === 'validating' && (
                        <div className="flex items-center gap-2 text-orange-600">
                          <div className="animate-pulse h-5 w-5 bg-orange-600 rounded-full" />
                          <span className="text-sm">Validerar...</span>
                        </div>
                      )}
                      {file.status === 'approved' && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircleIcon className="w-6 h-6" />
                          <span className="text-sm font-medium">Godkänd</span>
                        </div>
                      )}
                      {file.status === 'rejected' && (
                        <div className="flex items-center gap-2 text-red-600">
                          <XCircleIcon className="w-6 h-6" />
                          <span className="text-sm font-medium">Avvisad</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Specifications Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* File Requirements */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <InformationCircleIcon className="w-6 h-6 text-orange-500" />
              <h3 className="font-semibold text-gray-900">Filkrav</h3>
            </div>
            <div className="space-y-3">
              {specifications.map((spec) => (
                <div key={spec.label} className="flex justify-between text-sm">
                  <span className="text-gray-600">{spec.label}:</span>
                  <span className="font-medium text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Tips för bästa resultat</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Använd hög upplösning för skarp visning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Testa ditt material på olika enheter</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Håll texten läsbar på avstånd</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                <span>Undvik för många detaljer</span>
              </li>
            </ul>
          </div>

          {/* Help Button */}
          <button className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200">
            Behöver du hjälp?
          </button>
        </motion.div>
      </div>
    </div>
  );
} 
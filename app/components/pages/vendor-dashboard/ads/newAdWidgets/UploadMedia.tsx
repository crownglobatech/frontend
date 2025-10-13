'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react' // 👈 using Lucide icon

interface UploadMediaProps {
  onChange?: (files: File[]) => void
}

const UploadMedia: React.FC<UploadMediaProps> = ({ onChange }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const updated = [...selectedFiles, ...files]
      setSelectedFiles(updated)
      onChange?.(updated)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const updated = [...selectedFiles, ...files]
    setSelectedFiles(updated)
    onChange?.(updated)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleRemoveImage = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index)
    setSelectedFiles(updated)
    onChange?.(updated)
  }

  return (
    <div>
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className='p-6 border-2 border-gray-300 hover:border-purple-400 border-dashed rounded-md text-center transition cursor-pointer'
      >
        <input
          type='file'
          multiple
          accept='image/*'
          onChange={handleFileChange}
          id='fileInput'
          className='hidden'
        />
        <label htmlFor='fileInput' className='block cursor-pointer'>
          <div className='mb-2 text-gray-400 text-4xl'>☁️</div>
          <p className='text-[#334155] text-[12px]'>
            <span className='font-semibold'>Replace Images</span> or drag and
            drop
          </p>
        </label>
      </div>

      {/* Preview Area */}
      {selectedFiles.length > 0 && (
        <div className='gap-3 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] mt-4'>
          {selectedFiles.map((file, index) => (
            <div key={index} className='group relative'>
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className='border rounded-md w-full h-24 object-cover'
              />

              {/* Remove Button */}
              <button
                type='button'
                onClick={() => handleRemoveImage(index)}
                className='top-1 right-1 absolute bg-black/70 hover:bg-black p-1 rounded-full text-white transition'
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UploadMedia

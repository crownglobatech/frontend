'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react'

interface UploadMediaProps {
  files: File[] // parent state for uploaded files
  onChange: (files: File[]) => void
}

const UploadMedia: React.FC<UploadMediaProps> = ({ files, onChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      onChange([...files, ...newFiles])
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const dropped = Array.from(e.dataTransfer.files)
    onChange([...files, ...dropped])
  }

  const handleRemoveImage = (index: number) => {
    onChange(files.filter((_, i) => i !== index))
  }

  return (
    <div className='flex flex-col gap-4'>
      {/* Upload area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className='p-6 border-2 border-dashed rounded-md text-center cursor-pointer'
      >
        <input
          type='file'
          multiple
          name='photos'
          accept='image/*'
          id='fileInput'
          className='hidden'
          onChange={handleFileChange}
        />
        <label htmlFor='fileInput' className='block cursor-pointer'>
          <div className='mb-2 text-gray-400 text-4xl'>☁️</div>
          <p className='text-slate-600 text-sm'>
            <span className='font-semibold'>Upload Images</span> or drag and drop
          </p>
        </label>
      </div>

      {/* Preview */}
      {files.length > 0 && (
        <div className='gap-3 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))]'>
          {files.map((file, i) => (
            <div key={i} className='group relative'>
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className='border rounded-md w-full h-24 object-cover'
              />
              <button
                type='button'
                onClick={() => handleRemoveImage(i)}
                className='top-1 right-1 absolute bg-black/70 hover:bg-black p-1 rounded-full text-white'
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
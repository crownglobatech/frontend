'use client'
import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface ImageUploadProps {
  adData?: any
  onChange?: (data: { existing: string[]; newFiles: File[] }) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ adData, onChange }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState<string[]>(adData?.photo_urls || [])
  
  // watch for updates from parent after refetch
 useEffect(() => {
    if (adData?.photo_urls) {
      setExistingImages(adData.photo_urls)
      setSelectedFiles([]) // reset new uploads
    }
  }, [adData])
  // Send combined data to parent anytime something changes
  useEffect(() => {
    onChange?.({ existing: existingImages, newFiles: selectedFiles })
  }, [existingImages, selectedFiles])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const updated = [...selectedFiles, ...files]
      setSelectedFiles(updated)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const updated = [...selectedFiles, ...files]
    setSelectedFiles(updated)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

  const handleRemoveExisting = (index: number) => {
    const updated = existingImages.filter((_, i) => i !== index)
    setExistingImages(updated)
  }

  const handleRemoveNew = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index)
    setSelectedFiles(updated)
  }

  return (
    <div>
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className='p-6 border-2 hover:border-purple-400 border-dashed rounded-md text-center transition cursor-pointer'
      >
        <input
          type='file'
          multiple
          accept='image/*'
          id='fileInput'
          className='hidden'
          onChange={handleFileChange}
        />
        <label htmlFor='fileInput' className='block cursor-pointer'>
          <div className='mb-2 text-gray-400 text-4xl'>☁️</div>
          <p className='text-[#334155] text-[12px]'>
            <span className='font-semibold'>Replace Images</span> or drag and drop
          </p>
        </label>
      </div>

      {/* Preview Area */}
      <div className='gap-3 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] mt-4'>
        {/* Existing images */}
        {existingImages.map((url, index) => (
          <div key={`existing-${index}`} className='group relative'>
            <img
              src={url}
              alt={`Existing ${index}`}
              className='border rounded-md w-full h-24 object-cover'
            />
            <button
              type='button'
              onClick={() => handleRemoveExisting(index)}
              className='top-1 right-1 absolute bg-black/70 hover:bg-black p-1 rounded-full text-white transition'
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {/* New images */}
        {selectedFiles.map((file, index) => (
          <div key={`new-${index}`} className='group relative'>
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index}`}
              className='border rounded-md w-full h-24 object-cover'
            />
            <button
              type='button'
              onClick={() => handleRemoveNew(index)}
              className='top-1 right-1 absolute bg-black/70 hover:bg-black p-1 rounded-full text-white transition'
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageUpload

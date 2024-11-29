"use client"
import FileUploader from '@/components/fileUploader'
import QrCodeSection from '@/components/qrCodeSection'
import React, { useState } from 'react'

function page() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const afterSubmit = (slug) => {
    const generatedUrl = `http://localhost:3000/quizz/${slug}`;
    console.log(slug);
    setQrCodeUrl(generatedUrl); // Update qrCodeUrl state
  };
  return (
   <>
  {qrCodeUrl.length > 0 ? (
        <QrCodeSection qrCodeUrl={qrCodeUrl} title={''} />
      ) : (
        <FileUploader afterSubmit={afterSubmit} />
      )}
   </>
  )
}

export default page
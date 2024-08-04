"use client"

import React from 'react'
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'

type ShareProps ={
shareUrl: string
shareTitle: string
shareDescription?:string
shareImage?: string
}

const SocialMediaButton = ({shareUrl,shareTitle,shareDescription,shareImage}:ShareProps) => {
  return (
    <div className='flex gap-2 text-gray-600 text-sm justify-center items-center'>
        <p>Share:</p>
       <FacebookShareButton url={shareUrl} hashtag={shareTitle}>
            <FacebookIcon size={25} round />
            
          </FacebookShareButton>
          <WhatsappShareButton url={shareUrl} title={shareTitle}>
            <WhatsappIcon size={25} round />
          </WhatsappShareButton>

          <EmailShareButton url={shareUrl} subject={shareTitle} body={`${shareDescription}\n\n${shareImage}`}>
            <EmailIcon size={25} round />
          </EmailShareButton>
    </div>
  )
}

export default SocialMediaButton

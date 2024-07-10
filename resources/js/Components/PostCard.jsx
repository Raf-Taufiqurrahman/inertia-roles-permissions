import React from 'react'

export default function PostCard({ post }) {
  return (
    <div className='p-8 bg-white rounded-xl border'>
        <div className='font-semibold line-clamp-1'>{post.title}</div>
        <div className='text-sm text-gray-500 line-clamp-2'>{post.content}</div>
        <div className='text-sm font-semibold text-sky-500 mt-4'>
            Posted by - <span className='underline'>{post.user.name}</span>
        </div>
    </div>
  )
}

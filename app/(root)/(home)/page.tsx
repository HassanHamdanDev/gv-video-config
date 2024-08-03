import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

export default function Home() {
  const now = new Date();
  // get time in this format: 11:30 AM
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  // get date in this format: Saturday, March 12, 2024
  const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <section className='flex size-full flex-col gap-5 text-white'>
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex flex-col h-full justify-between max-md:py-8 max-md:px-5 lg:p-11">
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'> Upcoming Meeting at: 12:30 AM </h2>
          <div className="flex flex-col gap-2">
            <h1 className='text-4xl font-extrabold lg:text-7xl'> {time} </h1>
            <p className='text-sky-1 text-lg font-medium lg:text-2xl'>
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
    </section>
  )
}

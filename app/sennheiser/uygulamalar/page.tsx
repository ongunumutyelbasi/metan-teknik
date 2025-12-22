"use client";

import React from 'react';
import Link from 'next/link'; // Use Link instead of <a>
import { ArrowUpRight } from 'lucide-react';

export default function ApplicationsOverview() {

  const applicationTags = [
    "Filmmaking", "Broadcast", "Corporate", "Education", 
    "Live Production & Touring", "Live theatre", "Meeting and conference", 
    "Mobile journalism", "Presentation", "Studio recording", 
    "Virtual reality", "Visitor guidance", 
    "Assistive listening and audience engagement", "Places of worship"
  ];

  const applicationCards = [
    {
      title: "Live Production & Touring",
      image: "/images/apps/live-production.jpg",
      // Updated link to match your sennheiser sub-directory structure
      link: "/sennheiser/uygulamalar/live-production" 
    },
    {
      title: "Studio recording",
      image: "/images/apps/studio-recording.jpg",
      link: "/sennheiser/uygulamalar/studio-recording"
    },
    {
      title: "Meeting and conference",
      image: "/images/apps/meeting-conference.jpg",
      link: "/sennheiser/uygulamalar/meeting-conference"
    }
  ];

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      <div data-nav-color="dark">
        {/* Breadcrumb Section */}
        <nav className="px-5 md:px-5 pt-32 flex items-center space-x-2 text-sm">
          {/* Home Link - Points to Sennheiser Home */}
          <Link 
            href="/sennheiser" 
            className="transition-colors duration-300 text-[rgba(31,31,34,0.65)] hover:text-brand-blue"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="none" 
              viewBox="0 0 24 24" 
              className="w-4 h-4"
            >
              <path fill="currentColor" d="M19.5 9.75 12 2.25l-7.5 7.5V21h5.25v-7.5h4.5V21h5.25z"></path>
            </svg>
          </Link>
          
          <span className="text-gray-300 select-none">/</span>
          
          {/* Current Page Link - Updated Path */}
          <Link 
            href="/sennheiser/uygulamalar" 
            className="font-regular transition-colors duration-300 text-black hover:text-brand-blue"
          >
            Uygulamalar
          </Link>
        </nav>

        {/* Header Section */}
        <header className="px-5 md:px-5 pt-4 pb-12 bg-white">
          <h1 className="text-5xl md:text-5xl font-medium tracking-tight text-black mb-12">
            Uygulamalar
          </h1>

          {/* Tag Navigation Grid */}
          <div className="flex flex-wrap gap-2 max-w-7xl">
            {applicationTags.map((tag) => (
              <button 
                key={tag}
                className="px-4 py-2 rounded-full border border-gray-100 bg-gray-50/50 text-[13px] font-medium text-black hover:bg-gray-100 transition-colors duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </header>
      </div>

      <div className="h-[1px] w-full bg-gray-100 mb-12" />

      {/* Application Grid Section */}
      <section className="px-6 md:px-12 pb-24 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applicationCards.map((app, index) => (
            <Link 
              key={index} 
              href={app.link} 
              className="group flex flex-col space-y-4"
            >
              <div className="aspect-[16/9] overflow-hidden rounded-sm bg-gray-100">
                <img 
                  src={app.image} 
                  alt={app.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex items-center justify-between group/link">
                <h3 className="text-[22px] font-medium text-black leading-tight transition-colors duration-300 group-hover/link:text-brand-blue">
                  {app.title}
                </h3>
                <ArrowUpRight 
                  className="w-5 h-5 text-gray-400 transition-all duration-300 group-hover/link:text-brand-blue group-hover/link:-translate-y-1 group-hover/link:translate-x-1" 
                  strokeWidth={2}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
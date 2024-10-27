'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const user = `Numan01`;
const apiKey = `a9add90046a5723d0ffe0bab6bd341e0`;
const link = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=1`;

const SpotifyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-green-500 w-10 h-10 transition-transform transform group-hover:scale-105"
  >
    <path d="M12.001 2C6.50098 2 2.00098 6.5 2.00098 12C2.00098 17.5 6.50098 22 12.001 22C17.501 22 22.001 17.5 22.001 12C22.001 6.5 17.551 2 12.001 2ZM15.751 16.65C13.401 15.2 10.451 14.8992 6.95014 15.6992C6.60181 15.8008 6.30098 15.55 6.20098 15.25C6.10098 14.8992 6.35098 14.6 6.65098 14.5C10.451 13.6492 13.751 14 16.351 15.6C16.701 15.75 16.7501 16.1492 16.6018 16.45C16.4018 16.7492 16.0518 16.85 15.751 16.65ZM16.7501 13.95C14.051 12.3 9.95098 11.8 6.80098 12.8C6.40181 12.9 5.95098 12.7 5.85098 12.3C5.75098 11.9 5.95098 11.4492 6.35098 11.3492C10.001 10.25 14.501 10.8008 17.601 12.7C17.9018 12.8508 18.051 13.35 17.8018 13.7C17.551 14.05 17.101 14.2 16.7501 13.95ZM6.30098 9.75083C5.80098 9.9 5.30098 9.6 5.15098 9.15C5.00098 8.64917 5.30098 8.15 5.75098 7.99917C9.30098 6.94917 15.151 7.14917 18.8518 9.35C19.301 9.6 19.451 10.2 19.201 10.65C18.9518 11.0008 18.351 11.1492 17.9018 10.9C14.701 9 9.35098 8.8 6.30098 9.75083Z"></path>
  </svg>
);

interface Track {
  'artist': {
    '#text': string;
  };
  'album': {
    '#text': string;
  };
  'name': string;
  'image': Array<{
    'size': string;
    '#text': string;
  }>;
  '@attr'?: {
    nowplaying?: string;
  };
}

const CustomSpotify = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  useEffect(() => {
    const fetchRecentTracks = async () => {
      try {
        const response = await axios.get(link);
        const tracks: Track[] = response.data.recenttracks.track;
        const nowPlayingTrack = tracks.find((track) => track['@attr']?.nowplaying);
        setCurrentTrack(nowPlayingTrack || null);
      } catch (error) {
        console.error('Error fetching recent tracks:', error);
      }
    };

    fetchRecentTracks();
  }, []);

  return (
    <div className="bg-[#1a1a1a] p-5 rounded-xl shadow-md group transition-all duration-200 transform hover:scale-100 flex items-center space-x-4 hover:bg-[#1e1e1e]">
      {!currentTrack && <SpotifyIcon />}
      {currentTrack ? (
        <div className="flex items-center space-x-4">
          {currentTrack.image[3]?.['#text'] && (
            <Image
              src={currentTrack.image[3]['#text']}
              alt={currentTrack.name}
              width={80}
              height={80}
              className="rounded-md shadow-md transition-transform duration-200 transform group-hover:scale-100 group-hover:opacity-90"
            />
          )}
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-lg group-hover:text-green-400 transition-colors duration-200">{currentTrack.name}</h3>
            <p className="text-gray-400 text-sm group-hover:opacity-80 transition-opacity duration-200">by {currentTrack.artist['#text']}</p>
            <p className="text-gray-500 text-xs group-hover:opacity-70 transition-opacity duration-200">on {currentTrack.album['#text']}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-300">No track currently playing.</p>
      )}
    </div>
  );
};

export default CustomSpotify;

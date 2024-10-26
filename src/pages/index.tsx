import React, { useState, useEffect } from 'react';
import CustomLink from "@/components/ui/CustomLink";
import MainLayout from '../components/MainLayout';
import TextGenerateEffect from "@/components/ui/text-generate-effect";
import GradualSpacing from '@/components/ui/typing-animation';
import CustomSpotify from "@/components/ui/SpotifyWidget"; // Import CustomSpotify
import SkillsSection from "@/components/ui/SkillsSection"; // Import the new SkillsSection component

const IndexPage: React.FC = () => {
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  const allParagraphs = [
    "I bring creative ideas to life through dynamic web applications and technological exploration. My journey has been driven by curiosity and a commitment to growth, with each project offering new challenges and opportunities to expand my skills.",
    "As a self-taught software developer, I’ve developed a unique perspective on problem-solving and adaptability. I thrive on learning and experimenting with new technologies, always seeking the most efficient and creative ways to build.",
    "Outside of my coding adventures, I’m captivated by the Marvel and Star Wars universes, and I hold a deep appreciation for classic Bollywood films, which bring their own unique inspiration into my work."
  ];

  useEffect(() => {
    const addParagraphsSequentially = async () => {
      setParagraphs([]); 
      for (const paragraph of allParagraphs) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setParagraphs(prev => [...prev, paragraph]);
      }
    };
    addParagraphsSequentially();
  }, []);

  return (
    <MainLayout>
      <section className="flex flex-col items-center text-center max-w-2xl mx-auto py-16 px-6 relative z-10">
        <div className="mb-8">
          <GradualSpacing
            className="text-5xl font-bold text-white"
            text="Hi, I'm Numan Khan,"
          />
          <p className="text-lg text-gray-300 mt-4">
            A passionate developer with a love for designing innovative solutions and pushing the limits of technology.
          </p>

          {/* Spotify Widget */}
          <div className="mt-6">
            <CustomSpotify />
          </div>
        </div>

        <div className="mb-8 text-justify">
          {paragraphs.map((text, index) => (
            <TextGenerateEffect key={index} words={text} className="mb-4 text-sm" />
          ))}
        </div>

        {/* Skills Section */}

        <div className="mb-10 flex flex-wrap justify-center space-x-4">
          <CustomLink href="mailto:helloo@contactnuman.xyz" className="px-4 py-2 rounded" withIcon>
            Email Me
          </CustomLink>
          <CustomLink href="https://discord.com/users/877082451850178642" className="px-4 py-2 rounded" withIcon>
            Discord
          </CustomLink>
          <CustomLink href="https://github.com/Nuu-maan" className="px-4 py-2 rounded" withIcon>
            GitHub
          </CustomLink>
          <CustomLink href="https://x.com/Nuumaan01" className="px-4 py-2 rounded" withIcon>
            X
          </CustomLink>
        </div>
      </section>

      <footer className="p-4 text-center z-10">
        <p>Built using Next.js, Tailwind, and MDX.</p>
        <p className="mt-4">Beta v1.0.0</p>
      </footer>
    </MainLayout>
  );
};

export default IndexPage;

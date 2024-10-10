import React, { useState, useEffect } from 'react';
import CustomLink from "@/components/ui/CustomLink";
import MainLayout from '../components/MainLayout';
import TypingAnimation from "@/components/ui/typing-animation";
import TextGenerateEffect from "@/components/ui/text-generate-effect";
import CustomSpotify from "@/components/ui/SpotifyWidget"; 
import { Dock } from "@/components/ui/dock"; 
import { useTheme } from 'next-themes'; 

const IndexPage: React.FC = () => {
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const { theme } = useTheme();

  const allParagraphs = [
    "I bring creative ideas to life through dynamic web applications and technological exploration. My journey has been driven by curiosity and a commitment to growth, with each project offering new challenges and opportunities to expand my skills.",
    "As a self-taught software developer, I’ve developed a unique perspective on problem-solving and adaptability. I thrive on learning and experimenting with new technologies, always seeking the most efficient and creative ways to build.",
    "Outside of my coding adventures, I’m captivated by the Marvel and Star Wars universes, and I hold a deep appreciation for classic Bollywood films, which bring their own unique inspiration into my work."
  ];

  useEffect(() => {
    const addParagraphsSequentially = async () => {
      for (const paragraph of allParagraphs) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setParagraphs(prev => [...prev, paragraph]);
      }
    };
    addParagraphsSequentially();
  }, []);

  return (
    <MainLayout>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <section className={`flex flex-col items-center text-center max-w-2xl mx-auto py-10 px-6 rounded-lg shadow-xl mt-20`}>
          <div className="mb-8">
            <TypingAnimation className="text-5xl font-bold" text="Hi, I am Numan Khan" />
            <p className="text-lg mt-4">
              A passionate developer with a love for designing innovative solutions and pushing the limits of technology.
            </p>
          </div>

          <div className="mb-8 w-full">
            <CustomSpotify />
          </div>

          <div className="mb-8 text-justify">
            {paragraphs.map((text, index) => (
              <TextGenerateEffect key={index} words={text} className="mb-4 text-sm" />
            ))}
          </div>

          <div className="mb-10 flex flex-col sm:flex-row justify-center space-x-4">
            <CustomLink href="mailto:helloo@contactnuman.xyz" className="px-4 py-2 rounded" withIcon>
              Email Me
            </CustomLink>
            <CustomLink href="https://discord.com/users/877082451850178642" className="px-4 py-2 rounded" withIcon>
              Discord
            </CustomLink>
            <CustomLink href="https://github.com/Numan04" className="px-4 py-2 rounded" withIcon>
              GitHub
            </CustomLink>
            <CustomLink href="https://x.com/Nuumaan01" className="px-4 py-2 rounded" withIcon>
              X
            </CustomLink>
          </div>
        </section>

        <div className="fixed bottom-4 right-4">
          <Dock className="bg-gray-200 dark:bg-gray-800 rounded-md p-2" />
        </div>

        <footer className="text-center p-4">
          <p>Built using Next.js, Tailwind, and MDX.</p>
          <p className="mt-4">Beta v1.0.0</p>
        </footer>
      </div>
    </MainLayout>
  );
};

export default IndexPage;

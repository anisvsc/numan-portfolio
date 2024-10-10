import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link from Next.js for routing
import { Link as NextUILink } from "@nextui-org/react"; // Import Link from NextUI
import MainLayout from '../components/MainLayout'; // Ensure the path is correct
import TypingAnimation from "@/components/ui/typing-animation"; // Adjust the import path to where TypingAnimation is located
import TextGenerateEffect from "@/components/ui/text-generate-effect"; // Import your TextGenerateEffect component

const IndexPage: React.FC = () => {
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const allParagraphs = [
    "I bring creative ideas to life through dynamic web applications and technological exploration. My journey has been driven by curiosity and a commitment to growth, with each project offering new challenges and opportunities to expand my skills.",
    "As a self-taught software developer, I’ve developed a unique perspective on problem-solving and adaptability. I thrive on learning and experimenting with new technologies, always seeking the most efficient and creative ways to build.",
    "Outside of my coding adventures, I’m captivated by the Marvel and Star Wars universes, and I hold a deep appreciation for classic Bollywood films, which bring their own unique inspiration into my work."
  ];

  useEffect(() => {
    // Function to add paragraphs one by one with a delay
    const addParagraphsSequentially = async () => {
      // Check if paragraphs are already populated to prevent multiple calls
      if (paragraphs.length === 0) {
        for (let i = 0; i < allParagraphs.length; i++) {
          // Wait for 1 second before adding the next paragraph
          await new Promise(resolve => setTimeout(resolve, 1000)); // 1000ms = 1 second
          setParagraphs(prev => [...prev, allParagraphs[i]]);
        }
      }
    };

    addParagraphsSequentially();
  }, [paragraphs.length]); // Add dependency to ensure the effect runs only once

  return (
    <MainLayout>
      <section className="flex flex-col items-center text-center max-w-2xl mx-auto py-10 px-6 bg-black rounded-lg shadow-xl mt-20">
        {/* Introduction */}
        <div className="mb-8">
          <TypingAnimation
            className="text-5xl font-bold text-white"
            text="Hi, I'm Numan Khan,"
          />
          <p className="text-lg text-gray-300 mt-4">
            A passionate developer with a love for designing innovative solutions and pushing the limits of technology.
          </p>
        </div>

        {/* About Me Section */}
        <div className="mb-8 text-justify">
          {paragraphs.map((text, index) => (
            <TextGenerateEffect
              key={index} // Use index as key for mapping
              words={text}
              className="mb-4 text-gray-300" // Adjusting the class to make the text not bold
            />
          ))}
        </div>

        {/* Links Section */}
        <div className="mb-10 flex space-x-4"> {/* Use flex and space-x-4 to arrange buttons side by side */}
          <NextUILink isBlock href="mailto:helloo@contactnuman.xyz" color="primary" className="px-4 py-2 rounded">
            Email Me
          </NextUILink>
          <NextUILink isBlock href="https://discord.com" color="primary" className="px-4 py-2 rounded">
            Discord
          </NextUILink>
          <NextUILink isBlock href="https://github.com/Numan04" color="primary" className="px-4 py-2 rounded">
            GitHub
          </NextUILink>
          <NextUILink isBlock href="https://x.com" color="primary" className="px-4 py-2 rounded">
            X (formerly Twitter)
          </NextUILink>
        </div>

        {/* Footer */}
        <footer className="text-gray-300">
          <p>Built using Next.js, Tailwind, and MDX.</p>
          <p className="mt-4">Beta v1.0.0</p>
        </footer>
      </section>
    </MainLayout>
  );
};

export default IndexPage;

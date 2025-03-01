import Chat from './components/Chat';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-background to-zeus-marble relative">
      {/* Greek-inspired decorative elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-zeus-gold/5 via-zeus-gold/10 to-zeus-gold/5"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-zeus-gold/5 via-zeus-gold/10 to-zeus-gold/5"></div>

      <div className="container mx-auto max-w-6xl relative">
        {/* Greek column decorations */}
        <div className="hidden md:block absolute -left-8 top-0 bottom-0 w-4 bg-gradient-to-b from-zeus-gold/30 to-transparent"></div>
        <div className="hidden md:block absolute -right-8 top-0 bottom-0 w-4 bg-gradient-to-b from-zeus-gold/30 to-transparent"></div>

        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 mb-4">
            {/* Lightning effect around Zeus symbol */}
            <div className="absolute inset-0 bg-zeus-gold/20 rounded-full animate-[lightning-flash_3s_ease-in-out_infinite] -z-10"></div>
            <div className="absolute -inset-4 bg-zeus-gold/10 rounded-full animate-[lightning-flash_4s_ease-in-out_infinite_1s] -z-20"></div>
            <div className="flex items-center justify-center h-full w-full">
              <svg className="w-20 h-20 text-zeus-gold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 3L14.5 7H19L15.5 10L17 14L13 11.5L9 14L10.5 10L7 7H11.5L13 3Z" fill="currentColor" />
                <path d="M12 12L8 20H16L12 12Z" fill="currentColor" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-zeus-blue dark:text-zeus-gold mb-2 text-center">
            <span className="inline-block animate-[float-cloud_6s_ease-in-out_infinite]">Zeus Chat</span>
          </h1>
          <p className="text-lg text-zeus-blue/70 dark:text-zeus-gold/70 text-center max-w-md mb-6">
            Commune with the King of Olympus and seek divine wisdom from the ruler of Mount Olympus
          </p>
        </div>

        <Chat />

        <footer className="mt-12 text-center text-sm text-zeus-blue/60 dark:text-zeus-gold/60">
          <p>Powered by the divine wisdom of Zeus and the magic of AI</p>
        </footer>
      </div>
    </div>
  );
}
  );
}

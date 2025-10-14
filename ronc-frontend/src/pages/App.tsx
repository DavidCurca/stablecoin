import { Button } from '@/components/ui/button';
import { Banknote, Bitcoin, Landmark, Menu, MoveRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './App.css';
import { useNavigate } from 'react-router';


interface Banknote {
  url: string,
  width: number,
  height: number,
}

function App(props: { className: string }) {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [randomImages, setRandomImages] = useState<Banknote[]>([]);

  const width = 50, height = 50, offset = -10;
  const banknotes_images: Banknote[] = [
    { url: "/banknotes/100lei.png", width: 1936, height: 1080 },
    { url: "/banknotes/10lei.png", width: 1995, height: 1080 },
    { url: "/banknotes/1leu.png", width: 2090, height: 1080 },
    { url: "/banknotes/200lei.png", width: 1975, height: 1080 },
    { url: "/banknotes/20lei.png", width: 1995, height: 1112 },
    { url: "/banknotes/500lei.png", width: 2015, height: 1080 },
    { url: "/banknotes/50lei.png", width: 1963, height: 1080 },
    { url: "/banknotes/5lei.png", width: 2047, height: 1080 },
  ];

  const banknotes_background = () => {
    if(randomImages.length === 0) return [];
    const banknote_height = 100, gap = 10;
    let x = -1000, y = -2500;
    let ouput = [];
    for(let i = 0; i < height; i++) { 
      y = -2500;
      for(let j = 0; j < width; j++) {
        const image = randomImages[i * width + j];
        const node_width = (banknote_height / image.height) * image.width;
        const node = <img src={image.url} key={`${i}-${j}`} className={`h-[100px] absolute`} style={{top: `${x}px`, left: `${y}px` }} />;
        y += node_width + gap;
        ouput.push(node);
      }
      x += banknote_height + gap;
    }
    return ouput;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    const random_images = Array.from({ length: height * width }, () => banknotes_images[Math.floor(Math.random() * banknotes_images.length)]);
    setRandomImages(random_images);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-w-screen min-h-screen ${props.className}`}>
      {/* Page Content */}
      <div className='pb-16'>
        <div className='flex flex-row items-center justify-center flex-wrap mb-6 gap-5'>
          <div className='flex flex-col items-center justify-center gap-20 md:gap-15'>
            <div className='flex flex-col items-center justify-center gap-2 md:gap-10 '>
              <h1 className="text-center text-xl md:text-3xl md:w-[50vw] lg:text-5xl font-bold text-foreground text-balance">
                The Romanian Stablecoin is finally here
              </h1>
              <p className='description text-center text-sm w-[85%] md:w-[40vw] text-gray-500'>RONCOIN is a Romanian stablecoin on Solana and Polygon, pegged 1:1 with the leu (RON). Built for speed, transparency, and liquidity, it enables seamless cross-chain transactions and instant 24/7 redemption within a secure, decentralized ecosystem.</p>  
            </div>
            <div className='flex flex-row gap-2'>
              <Button className='cursor-pointer' onClick={() => navigate('/signup')}>Create Account</Button>
              <Button variant='outline' className='cursor-pointer'>See Features</Button>
            </div>
          </div>
          <div className='flex items-center justify-center border-2 border-dashed bg-gray-100 rounded-lg md:w-[40vw] w-[90vw] h-32 border-left-4 border-left-[#00ff00] canvas3d'>
            <p>Spinning 3D Model of coin here</p>
          </div>
        </div>
      </div>
      <div className='relative overflow-hidden'>
        <div className='relative z-0 w-[100vw] h-[500vh] rotate-[-15deg]' style={{
          transform: `translateX(${scrollY * 0.5}px)`,
          transition: 'transform 0.7s ease-out'
        }}>
          {banknotes_background()}
        </div>
        <div className='absolute top-0 left-0 w-[100vw] flex-col flex items-center justify-center pt-32'>
          <div className='bg-white border-2 border-gray-200 z-100 w-[90vw] max-w-[900px] p-5 rounded-lg'>
            <h1 className='flex flex-row items-center gap-2 font-bold'>Step 1: <Banknote /> <MoveRight /> <Landmark /> <MoveRight /> <Bitcoin /></h1>
            <div className='w-full h-1 bg-gray-200 mt-2 mb-2'></div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed egestas arcu, quis vehicula nisi. Duis sed risus ut dolor tempor rhoncus id non velit. Donec ac quam non magna bibendum tempus. Vestibulum eu mi facilisis, pulvinar quam in, ultrices ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas mauris sem, porta sed rutrum vel, pulvinar sit amet dui. Vestibulum et diam ligula. Etiam elementum leo nec erat convallis, eu ornare urna tristique. Praesent pulvinar nisl vel nunc gravida facilisis</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
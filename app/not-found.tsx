import LinkNavigation from '@/components/auth/LinkNavigation';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center bg-image text-center min-h-screen pl-5 pr-5 py-20'>
      <div className='bg-black p-10 rounded-md text-white'>
        <div className="flex flex-col justify-center items-center">
          <Image
              src="/logo.jpeg"
              width={250}
              height={20}
              alt="Logo"
          />
        </div>

        <h1 className='font-bold text-6xl'>404</h1>
        <h2 className='text-4xl text-center my-10'>Página No Encontrada</h2>

        <LinkNavigation href="/" title="Volver al Inicio"></LinkNavigation>
      </div>
    </div>
  );
}
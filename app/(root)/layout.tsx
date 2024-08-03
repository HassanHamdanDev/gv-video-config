import { StreamVideoProvider } from '@/Providers/StreamClientProvider'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Guav",
  description: "Video Calling App",
  icons:{
    icon :'/icons/logo.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

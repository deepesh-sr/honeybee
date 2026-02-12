import { ThemeProvider } from './components/theme-provider';
import { Navigation } from './components/navigation';
import { Footer } from './components/footer';
import { Hero } from './sections/hero';
import { AnimationEffects } from './sections/animation-effects';
import { GradientGallery } from './sections/gradient-gallery';
import { CustomCursor } from './components/custom-cursor';
import { ParticleBackground } from './components/particle-background';
import { FloatingOrbs } from './components/floating-orbs';
import { ScrollProgress } from './components/scroll-progress';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
        {/* Background Effects */}
        <FloatingOrbs />
        <ParticleBackground />
        
        {/* UI Elements */}
        <CustomCursor />
        <ScrollProgress />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main className="relative z-10">
          <Hero />
          <AnimationEffects />
          <GradientGallery />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

import { lazy, Suspense } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Navigation } from './components/navigation';
import { Footer } from './components/footer';
import { Hero } from './sections/hero';
import { CustomCursor } from './components/custom-cursor';
import { ScrollProgress } from './components/scroll-progress';

// Lazy load heavy sections for better performance
const AnimationEffects = lazy(() => import('./sections/animation-effects'));
const GradientGallery = lazy(() => import('./sections/gradient-gallery'));
const FontShowcase = lazy(() => import('./sections/font-showcase'));

// Loading fallback
const SectionLoader = () => (
  <div className="py-32 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-honey/30 border-t-honey rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
        {/* Background Effects - Optimized */}
        <div className="fixed inset-0 honeycomb-pattern opacity-50 pointer-events-none z-0" />
        
        {/* UI Elements */}
        <CustomCursor />
        <ScrollProgress />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main className="relative z-10">
          <Hero />
          <Suspense fallback={<SectionLoader />}>
            <AnimationEffects />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <GradientGallery />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <FontShowcase />
          </Suspense>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

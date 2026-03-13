import HeroBanner from '../components/HeroBanner/HeroBanner';
import CategoryGrid from '../components/CategoryGrid/CategoryGrid';
import FeatureBar from '../components/FeatureBar/FeatureBar';
import BestSellers from '../components/BestSellers/BestSellers';
import PromoBanner from '../components/PromoBanner/PromoBanner';
import CountdownBanner from '../components/CountdownBanner/CountdownBanner';

export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <FeatureBar />
      <CategoryGrid />
      <BestSellers />
      <PromoBanner />
      <CountdownBanner />
    </main>
  );
}

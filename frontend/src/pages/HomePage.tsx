import HeroBanner from '../components/HeroBanner/HeroBanner';
import CategoryGrid from '../components/CategoryGrid/CategoryGrid';
import FeatureBar from '../components/FeatureBar/FeatureBar';
import BestSellers from '../components/BestSellers/BestSellers';
import CountdownBanner from '../components/CountdownBanner/CountdownBanner';

export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <FeatureBar />
      <CategoryGrid />
      <BestSellers />
      <CountdownBanner />
    </main>
  );
}

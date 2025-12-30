import HeroBanner from "./components/HeroBanner";
import AboutUsSection from "./components/AboutUs";
import ProgrammesSection from "./components/ExplorePrograms";
import ServicesSection from "./components/ServicesSection";
import UniversityUpdates from "./components/UniversityUpdates";
import CampusSection from "./components/Campuses";
import LifeAtCampusSection from "./components/LifeAtCampus"
import ResourcesFacilities from "./components/Resources"
import CampusNews from "./components/News"
import CampusEvents from "./components/Events"
import AchievementsAwards from "./components/Achievements"
import OurProudAlumni from "./components/Alumni"

export default function Home() {
  return (
    <>
      <HeroBanner />
      <AboutUsSection />
      <ProgrammesSection />
      <ServicesSection />
      <UniversityUpdates />
      <CampusSection />
      <LifeAtCampusSection />
      <ResourcesFacilities />
      <CampusNews />
      <CampusEvents />
      <AchievementsAwards />
      <OurProudAlumni />
    </>
  );
}

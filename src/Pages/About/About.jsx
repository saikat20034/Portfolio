import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import AboutMe from '../../components/AboutMe/AboutMe';
import EducationDetails from '../../components/EducationDetails/EducationDetails';
// import 'react-tabs/style/react-tabs.css';
function About() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="max-w-6xl mx-auto">
      <Tabs>
        <TabList className="grid gap-2 grid-flow-col text-center text-gray-500 bg-gray-200 rounded-full p-2 max-w-3xl mx-3 md:mx-auto">
          <Tab
            onClick={() => setActiveTab(0)}
            default={true}
            className={`flex justify-center py-2 md:py-3 text-base md:text-xl font-manrope hover:scale-105 duration-500 ${
              activeTab === 0
                ? 'bg-[#675C9C] rounded-full shadow text-white outline-none border-none font-semibold'
                : ''
            }`}
          >
            About Me
          </Tab>
          <Tab
            onClick={() => setActiveTab(1)}
            className={`flex justify-center py-2 md:py-3 text-base md:text-xl  font-manrope ${
              activeTab === 1
                ? 'bg-[#675C9C] rounded-full shadow text-white outline-none border-none font-semibold'
                : ''
            }`}
          >
            Education Details
          </Tab>
        </TabList>

        <TabPanel>
          <AboutMe/>
        </TabPanel>
        <TabPanel className="mt-4">
          <EducationDetails/>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default About;

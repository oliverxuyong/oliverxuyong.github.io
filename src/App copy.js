import React, { useState } from 'react';
import './App.css';
//import WorkShop from './WorkShop.jsx';
import Guide from './Guide.jsx';
import AboutMe from './About.jsx';
import Helper from './Helper.jsx';


// List of items for the Study menu
const studyItems = [
  'alex_and_jordan',
  '100-sentences-casual-talking',
  '50-sentences-family-life',
  'the-playground',
  'the-playground-part-2',
  'the-council-with-the-munchkins',
  'learn-english-with-chatgtp',
  'Casablanca',
  '100-sophisticated-sentences'
   // Add more items as needed
];

export default function App() {
  const [material, setMaterial] = useState(studyItems[5]);
  const [currentTab, setCurrentTab] = useState('Study');
  const [isStudyMenuOpen, setIsStudyMenuOpen] = useState(false);
  const [showHelper, setShowHelper] = useState(false);

  const handleMenuItemClick = (item) => {
    setMaterial(item);
    setIsStudyMenuOpen(false);
  };

  const handleTabClick = (tab) => {
    /*
    if (tab === 'Study') {
      setIsStudyMenuOpen(!isStudyMenuOpen);
    } else {
      setIsStudyMenuOpen(false);
    }*/
    setCurrentTab(tab);
  };
  const toggleStudyMenuOpen = () => {
    setIsStudyMenuOpen(!isStudyMenuOpen);
  };
  const toggleHelperPage = () => {
    setShowHelper(!showHelper);
  };

  return (
    <div>
    <div className="helper" style={{margin:'10px',fontSize:'1.5em',textAlign:'right'}}>
      <div ><i className="fa fa-question-circle" onClick={toggleHelperPage}></i> </div>
    </div>
    <div>
      {showHelper && <Helper />}
    </div>
      <br />
      <div className="study-title">
        <h2 onClick={toggleStudyMenuOpen} >
          {material.toUpperCase().replace(/-/g, ' ')}
        </h2>
        {isStudyMenuOpen && (
              <div className="dropdown-menu">
                {studyItems.map((item, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleMenuItemClick(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
        )}
      </div>
      <br />
      <div>
        {/*currentTab === 'Study' && <WorkShop material={material} />*/}

        {currentTab === 'Guide' && <Guide />}
        {currentTab === 'About Me' && <AboutMe />}
        {/* Add other tabs as needed */}
      </div>
      <div className="tab-container">
        <div
          className={`tab ${currentTab === 'Study' ? 'active' : ''}`}
          onClick={() => handleTabClick('Study')}
        >
          Study

        </div>
        <div
          className={`tab ${currentTab === 'Guide' ? 'active' : ''}`}
          onClick={() => handleTabClick('Guide')}
        >
          How
        </div>
        <div
          className={`tab ${currentTab === 'About Me' ? 'active' : ''}`}
          onClick={() => handleTabClick('About Me')}
        >
          About
        </div>
      </div>
    </div>
  );
}

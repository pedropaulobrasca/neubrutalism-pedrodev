'use client'

import { useState } from 'react'
import Header from '@/components/header/header'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import PersonalInfo from '@/components/sections/personal-info'
import EducationalInfo from '@/components/sections/educational-info'
import ExperienceInfo from '@/components/sections/experience-info'
import { LanguageContent, Styles } from '@/types'
import ProjectsInfo from '@/components/sections/projects-info'
import CoursesInfo from '@/components/sections/courses-info'
import SkillsInfo from '@/components/sections/skills-info'
import SoftSkillsInfo from '@/components/sections/soft-skills-info'
import { content as curriculumContent } from '@/content/content'
import { getStyles } from '@/components/styles'

export default function EnhancedNeubrutalismCurriculum() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [language, setLanguage] = useState<'pt-BR' | 'en-US'>('pt-BR')

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
  const toggleLanguage = () => setLanguage(language === 'pt-BR' ? 'en-US' : 'pt-BR')

  const styles: Styles = getStyles(isDarkMode);

  const exportToPDF = () => {
    const input = document.getElementById('curriculum');

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('curriculum.pdf');
      });
    }
  }

  const currentContent: LanguageContent = curriculumContent[language]

  return (
    <div id="curriculum" className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-blue-100'}`}>
      <div className="max-w-4xl mx-auto p-6">
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          toggleLanguage={toggleLanguage}
          exportToPDF={exportToPDF}
          buttonStyle={styles.buttonStyle}
        />

        <PersonalInfo content={currentContent} styles={styles} />
        <EducationalInfo content={currentContent.education} styles={styles} />
        <ExperienceInfo content={currentContent.experience} styles={styles} />
        <ProjectsInfo content={currentContent.projects} styles={styles} />
        <CoursesInfo content={currentContent.courses} styles={styles} />
        <SkillsInfo content={currentContent.skills} styles={styles} />
        <SoftSkillsInfo content={currentContent.softSkills} styles={styles} /> 
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import Header from '@/components/header/header'
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

  const exportToPDF = async () => {
    try {
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language }),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar o PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'curriculum.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.');
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
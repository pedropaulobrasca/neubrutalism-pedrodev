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
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export default function EnhancedNeubrutalismCurriculum() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [language, setLanguage] = useState<'pt-BR' | 'en-US'>('pt-BR')

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
  const toggleLanguage = () => setLanguage(language === 'pt-BR' ? 'en-US' : 'pt-BR')

  const styles: Styles = getStyles(isDarkMode);

  const exportToPDF = () => {
    const input = document.getElementById('curriculum');
  
    if (!input) {
      console.error('Elemento com id "curriculum" não encontrado.');
      return;
    }
  
    // Definir margens em unidades pt
    const margin = 40; // Margem de 40pt em todos os lados
  
    html2canvas(input, {
      scale: 3, // Aumenta a escala para maior resolução
      useCORS: true, // Habilita suporte a CORS para imagens externas
      allowTaint: true, // Permite processar conteúdo com Taint (imagens externas)
      backgroundColor: null, // Preserva a cor de fundo
      logging: true, // Habilita logs para depuração
    }).then(canvas => {
      const pdf = new jsPDF('portrait', 'pt', 'a4'); // Formato A4
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      // Calcula a largura e altura da imagem dentro das margens
      const imgWidth = pdfWidth - 2 * margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      const totalPages = Math.ceil(imgHeight / (pdfHeight - 2 * margin));
      const pageCanvas = document.createElement('canvas');
      const pageCtx = pageCanvas.getContext('2d');
  
      // Define o tamanho do canvas para cada página
      pageCanvas.width = canvas.width;
      pageCanvas.height = (pdfHeight - 2 * margin) * (canvas.width / imgWidth);
  
      for (let i = 0; i < totalPages; i++) {
        // Define a área do canvas original que será desenhada na página atual
        const srcY = (pdfHeight - 2 * margin) * i * (canvas.width / imgWidth);
        const srcHeight = pageCanvas.height;
  
        // Limita a altura se for a última página
        const drawHeight = (i + 1) === totalPages
          ? canvas.height - srcY
          : srcHeight;
  
        // Limpa o canvas temporário
        pageCtx?.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
  
        // Desenha a parte correspondente do canvas original no canvas da página
        pageCtx?.drawImage(
          canvas,
          0, srcY, canvas.width, drawHeight,
          0, 0, canvas.width, drawHeight
        );
  
        // Converte o canvas da página em imagem
        const imgData = pageCanvas.toDataURL('image/png');
  
        if (i > 0) {
          pdf.addPage();
        }
  
        // Adiciona a imagem ao PDF com margens
        pdf.addImage(
          imgData,
          'PNG',
          margin,
          margin,
          imgWidth,
          (drawHeight * imgWidth) / canvas.width
        );
      }
  
      pdf.save('Pedro Paulo B Trevisanuto.pdf'); // Gera o PDF
    }).catch(error => {
      console.error('Erro ao gerar o PDF:', error);
    });
  }

  const currentContent: LanguageContent = curriculumContent[language]

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-blue-100'}`}>
      <div className="max-w-4xl mx-auto p-6">
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          toggleLanguage={toggleLanguage}
          exportToPDF={exportToPDF}
          buttonStyle={styles.buttonStyle}
        />

        <div id="curriculum">
          <PersonalInfo content={currentContent} styles={styles} />
          <EducationalInfo content={currentContent.education} styles={styles} />
          <ExperienceInfo content={currentContent.experience} styles={styles} />
          <ProjectsInfo content={currentContent.projects} styles={styles} />
          <CoursesInfo content={currentContent.courses} styles={styles} />
          <SkillsInfo content={currentContent.skills} styles={styles} />
          <SoftSkillsInfo content={currentContent.softSkills} styles={styles} /> 
        </div>
      </div>
    </div>
  )
}

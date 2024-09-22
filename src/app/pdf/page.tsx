import PersonalInfo from '@/components/sections/personal-info';
import EducationalInfo from '@/components/sections/educational-info';
import ExperienceInfo from '@/components/sections/experience-info';
import ProjectsInfo from '@/components/sections/projects-info';
import CoursesInfo from '@/components/sections/courses-info';
import SkillsInfo from '@/components/sections/skills-info';
import SoftSkillsInfo from '@/components/sections/soft-skills-info';
import { content as curriculumContent } from '@/content/content';
import { LanguageContent, Styles } from '@/types';
import { getStyles } from '@/components/styles';

export default async function PDFPage({ searchParams }: { searchParams: { lang?: string } }) {
  const lang = searchParams.lang || 'pt-BR';
  const currentContent: LanguageContent = curriculumContent[lang as keyof typeof curriculumContent];

  const styles: Styles = getStyles(false); // Pode optar por desabilitar o dark mode na versão PDF

  return (
    <div id="curriculum" className={`min-h-screen bg-white text-black`}>
      <div className="max-w-4xl mx-auto p-6">
        <PersonalInfo content={currentContent} styles={styles} />
        <EducationalInfo content={currentContent.education} styles={styles} />
        <ExperienceInfo content={currentContent.experience} styles={styles} />
        <ProjectsInfo content={currentContent.projects} styles={styles} />
        <CoursesInfo content={currentContent.courses} styles={styles} />
        <SkillsInfo content={currentContent.skills} styles={styles} />
        <SoftSkillsInfo content={currentContent.softSkills} styles={styles} />
      </div>
    </div>
  );
}

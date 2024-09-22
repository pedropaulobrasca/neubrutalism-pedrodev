import { Card } from "@/components/ui/card";
import { Projects, Styles } from "@/types";

interface ProjectsInfoProps {
  content: Projects;
  styles: Styles;
}

export default function ProjectsInfo({ content, styles }: ProjectsInfoProps) {
  return (
    <Card className={styles.sectionStyle}>
      <h2 className={styles.titleStyle}>{content.title}</h2>
      {content.list.map((project, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <a href={project.link} target="_blank">
            <h3 className={styles.subtitleStyle}>{project.name}</h3>
            <p className={styles.textStyle}>{project.description}</p>
          </a>
        </div>
      ))}
    </Card>
  );
}

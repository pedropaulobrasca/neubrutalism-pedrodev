import { Card } from "@/components/ui/card";
import { Experience, Styles } from "@/types";

interface ExperienceInfoProps {
  content: Experience;
  styles: Styles;
}

export default function ExperienceInfo({ content, styles }: ExperienceInfoProps) {
  return (
    <Card className={styles.sectionStyle}>
      <h2 className={styles.titleStyle}>{content.title}</h2>
      {content.jobs.map((job, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <h3 className={styles.subtitleStyle}>{job.company}</h3>
          <p className={styles.textStyle}>{job.role}</p>
          <p className={styles.textStyle}>{job.period}</p>
          <p className={styles.textStyle}>{job.activities}</p>
        </div>
      ))}
    </Card>
  );
}

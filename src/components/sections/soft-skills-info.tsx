import { Card } from "@/components/ui/card";
import { SoftSkills, Styles } from "@/types";

interface SoftSkillsInfoProps {
  content: SoftSkills;
  styles: Styles;
}

export default function SoftSkillsInfo({ content, styles }: SoftSkillsInfoProps) {
  return (
    <Card className={styles.sectionStyle}>
      <h2 className={styles.titleStyle}>{content.title}</h2>
      <div className="flex flex-wrap -m-1">
        {content.list.map((skill, index) => (
          <span key={index} className={styles.badgeStyle}>{skill}</span>
        ))}
      </div>
    </Card>
  );
}

import { Card } from "@/components/ui/card";
import { Skills, Styles } from "@/types";

interface SkillsInfoProps {
  content: Skills;
  styles: Styles;
}

export default function SkillsInfo({ content, styles }: SkillsInfoProps) {
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

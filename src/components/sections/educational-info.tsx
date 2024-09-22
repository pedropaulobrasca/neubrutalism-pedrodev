import { Card } from "@/components/ui/card";
import { Education, Styles } from "@/types";

interface EducationalInfoProps {
  content: Education;
  styles: Styles;
}

export default function EducationalInfo({ content, styles }: EducationalInfoProps) {
  return (
    <Card className={styles.sectionStyle}>
      <h2 className={styles.titleStyle}>{content.title}</h2>
      <p className={styles.textStyle}>{content.degree}</p>
      <p className={styles.textStyle}>{content.university}</p>
      <p className={styles.textStyle}>{content.graduationDate}</p>
    </Card>
  );
}

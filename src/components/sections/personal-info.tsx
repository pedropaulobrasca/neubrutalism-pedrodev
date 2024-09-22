import { Card } from "@/components/ui/card";

interface PersonalInfoProps {
  content: any;
  styles: any;
}

export default function PersonalInfo({ content, styles }: PersonalInfoProps) {
  return (
    <Card className={styles.sectionStyle}>
      <h1 className={styles.titleStyle}>{content.name}</h1>
      <p className={styles.subtitleStyle}>{content.title}</p>
      <p className={styles.textStyle}>{content.address}</p>
      <p className={styles.textStyle}>{content.phone}</p>
      <p className={styles.textStyle}>{content.email}</p>
    </Card>
  );
}

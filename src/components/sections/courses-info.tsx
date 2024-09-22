import { Card } from "@/components/ui/card";
import { Courses, Styles } from "@/types";

interface CoursesInfoProps {
  content: Courses;
  styles: Styles;
}

export default function CoursesInfo({ content, styles }: CoursesInfoProps) {
  return (
    <Card className={styles.sectionStyle}>
      <h2 className={styles.titleStyle}>{content.title}</h2>
      {content.list.map((course, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <h3 className={styles.subtitleStyle}>{course.name}</h3>
          <p className={styles.textStyle}>{course.provider}</p>
          <p className={styles.textStyle}>{course.duration}</p>
          <p className={styles.textStyle}>{course.content}</p>
        </div>
      ))}
    </Card>
  );
}

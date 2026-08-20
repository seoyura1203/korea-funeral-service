type Crumb = { title: string; href?: string };

/**
 * 서브페이지 상단 헤더. 영문 eyebrow와 브레드크럼(홈 > ...)은 노출하지 않고
 * 한글 타이틀/서브타이틀만 표시합니다. (eyebrow/breadcrumbs prop은 호출부
 * 변경을 최소화하기 위해 계속 받지만 렌더링하지는 않습니다.)
 */
export default function PageHeader({
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
}) {
  return (
    <div className="container pb-4 pt-10 text-center md:pb-6 md:pt-14">
      <h1 className="font-serif text-2xl font-bold md:text-3xl">{title}</h1>
      {description && (
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

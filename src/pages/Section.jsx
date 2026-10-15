import { getSectionBySlug } from "../content/structure.js";
import PageHeader from "../components/PageHeader.jsx";
import ContentRenderer from "../components/ContentRenderer.jsx";
import SectionNav from "../components/SectionNav.jsx";
import NotFound from "./NotFound.jsx";

export default function Section({ slug }) {
  const section = getSectionBySlug(slug);
  if (!section) return <NotFound />;

  return (
    <div>
      <PageHeader section={section} />
      <ContentRenderer content={section.content} />
      <SectionNav slug={slug} />
    </div>
  );
}

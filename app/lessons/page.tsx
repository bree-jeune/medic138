import Link from 'next/link';
import { getAllMarkdownSlugs, getMarkdownData } from '@/lib/markdown';

export default async function LessonsIndex() {
  const slugObjects = getAllMarkdownSlugs('_lessons');
  
  const allLessons = await Promise.all(
    slugObjects.map(async (slugObj) => {
      const slug = slugObj.params.slug;
      const data = await getMarkdownData('_lessons', slug);
      return data;
    })
  );

  // Filter out any nulls if file reading failed
  const validLessons = allLessons.filter(Boolean) as {
    slug: string;
    contentHtml: string;
    title?: string;
    summary?: string;
  }[];

  return (
    <main className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-medicTeal">Medic 138 Lessons</h1>
        <div className="grid gap-6">
          {validLessons.map((lesson) => (
            <Link 
              href={`/lessons/${lesson.slug}`} 
              key={lesson.slug}
              className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
            >
              <h2 className="text-2xl font-semibold mb-2">{lesson.title || lesson.slug}</h2>
              {lesson.summary && (
                <p className="text-gray-600 dark:text-gray-400">{lesson.summary}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

import { getMarkdownData, getAllMarkdownSlugs } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return getAllMarkdownSlugs('_lessons');
}

export default async function LessonPage({ params }: { params: { slug: string } }) {
  const lessonData = await getMarkdownData('_lessons', params.slug);

  if (!lessonData) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <Link 
          href="/lessons" 
          className="inline-flex items-center gap-2 text-medicTeal hover:text-teal-700 mb-8 transition font-medium"
        >
          <ArrowLeft size={20} /> Back to Lessons
        </Link>
        <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          {lessonData.title && (
            <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-center md:text-left">
              {lessonData.title}
            </h1>
          )}
          <div 
            className="prose prose-lg dark:prose-invert prose-teal max-w-none"
            dangerouslySetInnerHTML={{ __html: lessonData.contentHtml }} 
          />
        </div>
      </div>
    </article>
  );
}

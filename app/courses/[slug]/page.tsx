import { getMarkdownData, getAllMarkdownSlugs } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return getAllMarkdownSlugs('_courses');
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const courseData = await getMarkdownData('_courses', params.slug);

  if (!courseData) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link 
          href="/courses" 
          className="inline-flex items-center gap-2 text-medicTeal hover:text-teal-700 mb-8 transition font-medium"
        >
          <ArrowLeft size={20} /> Back to Courses
        </Link>
        <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          {courseData.title && (
            <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              {courseData.title}
            </h1>
          )}
          <div 
            className="prose prose-lg dark:prose-invert prose-teal max-w-none"
            dangerouslySetInnerHTML={{ __html: courseData.contentHtml }} 
          />
        </div>
      </div>
    </article>
  );
}

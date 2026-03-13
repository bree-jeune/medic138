import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), '_lessons');
const coursesDirectory = path.join(process.cwd(), '_courses');

export async function getLessonData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  let fileContents = '';
  
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (err) {
    const backupPath = path.join(postsDirectory, `${slug}.markdown`);
    try {
      fileContents = fs.readFileSync(backupPath, 'utf8');
    } catch {
      return null;
    }
  }

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    slug,
    contentHtml,
    ...(matterResult.data as { title?: string; summary?: string; date?: string; category?: string }),
  };
}

export function getAllLessonSlugs() {
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch {
    return [];
  }
  
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$|\.markdown$/, ''),
      },
    };
  });
}

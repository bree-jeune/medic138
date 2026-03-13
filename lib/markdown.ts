import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function getMarkdownData(directory: string, slug: string) {
  const fullPath = path.join(process.cwd(), directory, `${slug}.md`);
  let fileContents = '';
  
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (err) {
    const backupPath = path.join(process.cwd(), directory, `${slug}.markdown`);
    try {
      fileContents = fs.readFileSync(backupPath, 'utf8');
    } catch {
      return null;
    }
  }

  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as { title?: string; summary?: string; date?: string; category?: string }),
  };
}

export function getAllMarkdownSlugs(directory: string) {
  const dirPath = path.join(process.cwd(), directory);
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(dirPath);
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

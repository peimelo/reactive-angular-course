import { Request, Response } from 'express';
import { setTimeout } from 'timers';
import { LESSONS } from './db-data';

export function searchLessons(req: Request, res: Response) {
  const queryParams = req.query;

  const courseId = queryParams.courseId,
    filter = <string>queryParams.filter || '',
    sortOrder = queryParams.sortOrder || 'asc',
    pageNumber = parseInt(<string>queryParams.pageNumber) || 0,
    pageSize = parseInt(<string>queryParams.pageSize) || 3;

  let lessons;

  if (courseId) {
    lessons = Object.values(LESSONS)
      .filter((lesson) => lesson.courseId === parseInt(<string>courseId))
      .sort((l1, l2) => l1.id - l2.id);
  } else {
    lessons = Object.values(LESSONS);
  }

  if (filter) {
    lessons = lessons.filter(
      (lesson) =>
        lesson.description.trim().toLowerCase().search(filter.toLowerCase()) >=
        0
    );
  }

  if (sortOrder == 'desc') {
    lessons = lessons.reverse();
  }

  const initialPos = pageNumber * pageSize;

  const lessonsPage = lessons.slice(initialPos, initialPos + pageSize);

  setTimeout(() => {
    res.status(200).json({ payload: lessonsPage });
  }, 1000);
}

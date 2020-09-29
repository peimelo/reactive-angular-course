import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { CoursesService } from '../services/courses.service';

interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  // course$: Observable<Course>;
  // lessons$: Observable<Lesson[]>;

  data$: Observable<CourseData>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService
  ) {}

  ngOnInit() {
    const courseId = +this.route.snapshot.paramMap.get('courseId');

    const course$ = this.courseService
      .loadCoursById(courseId)
      .pipe(startWith(null));

    const lessons$ = this.courseService
      .loadAllCourseLessons(courseId)
      .pipe(startWith([]));

    this.data$ = combineLatest([course$, lessons$]).pipe(
      map(([course, lessons]) => {
        return {
          course,
          lessons,
        };
      }),
      tap(console.log)
    );

    // this.course$ = this.courseService.loadCoursById(courseId);
    // this.lessons$ = this.courseService.loadAllCourseLessons(courseId);
  }
}

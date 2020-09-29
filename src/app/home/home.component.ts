import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { Course } from '../model/course';
// import { CoursesService } from '../services/courses.service';
import { CoursesStore } from '../services/courses.store';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    // private coursesService: CoursesService,
    private coursesStore: CoursesStore,
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    this.beginnerCourses$ = this.coursesStore.filterByCategory('BEGINNER');

    this.advancedCourses$ = this.coursesStore.filterByCategory('ADVANCED');
  }

  /*   reloadCourses() {
    const courses$ = this.coursesService.loadAllCourses().pipe(
      map((courses) => courses.sort(sortCoursesBySeqNo)),
      catchError((err) => {
        const message = 'Could not load courses';
        this.messagesService.showErrors(message);
        console.log(message, err);
        return throwError(err);
      })
    );

    const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);

    this.beginnerCourses$ = loadCourses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === 'BEGINNER')
      )
    );

    this.advancedCourses$ = loadCourses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === 'ADVANCED')
      )
    );
  } */
}

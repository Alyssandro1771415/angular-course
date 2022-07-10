import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
    templateUrl: './course-list.component.html'
})


export class CourseListComponent implements OnInit {

    courses: Course[] = []; 
    /*Aqui ele está declarando que courses recebe o tipo Course que declarei em 
    course.ts e diz que isso recebe uma string, essa estring com valores está declarada logo abaixo daqui
    em ngOnInit que é o componente que não retorna nada e recebe o ngOnInit.course com os valores declarados.*/

    filteredCourses: Course[] = [];

    _courses: Course[] = [];
    
    _filterBy: string|any;

    constructor(private courseService: CourseService) { }

    ngOnInit(): void{
        this.retrieveAll();
    }

    retrieveAll(): void { 
        this.courseService.retrieveAll().subscribe({
            next: courses => {
                this._courses = courses;
                this.filteredCourses = this._courses;
            },
            error: err => console.log('Error', err) 
        })
    }

    deleteById(courseId: number): void{
        this.courseService.deleteById(courseId).subscribe({
            next: () => {
                console.log('Deleted with sucess')
                this.retrieveAll();
            },
            error: err => console.log('Error', err)
        })
    }

    set filter(value: string) { 
        this._filterBy = value;

        this.filteredCourses = this._courses.filter((course: Course) => course.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
    }

    get filter() { 
        return this._filterBy;
    }
}
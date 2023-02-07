export class Course {
    constructor (
        private id: string,
        private name: string,
        private lessons: string
    ) {}

    public getId(): string {
        return this.id
    }
    public setId(value: string) {
        this.id = value
    }

    public getName(): string {
        return this.name
    }
    public setName(value: string) {
        this.name = value
    }

    public getLessons(): string {
        return this.lessons
    }
    public setLessons(value: string) {
        this.lessons = value
    }
}
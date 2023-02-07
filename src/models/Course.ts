export class Course {
    constructor (
        private id: string,
        private name: string,
        private lessons: number
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

    public getLessons(): number {
        return this.lessons
    }
    public setLessons(value: number) {
        this.lessons = value
    }
}
export interface SongDB {
    id: string,
    artist: string,
    name: string,
    uploaded_at: string,
    total_views: number,
};

export interface CourseDB {
    id: string,
    name: string,
    lessons: number
}
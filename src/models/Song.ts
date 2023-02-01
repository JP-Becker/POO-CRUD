export class Song {
    
    constructor (
        private id: string,
        private artist: string,
        private name: string,
        private uploaded_at: string,
        private total_views: number,
    ) {}

    public getId(): string {
        return this.id
    }
    public setId(value: string) {
        this.id = value
    }

    public getArtist(): string {
        return this.artist
    }
    public setArtist(value: string): void {
        this.artist = value
    }

    public getName(): string {
        return this.name
    }
    public setName(value: string): void {
        this.name = value
    }

    public getUploadedAt(): string {
        return this.uploaded_at
    }
    public setUploadedAt(value: string): void {
        this.uploaded_at = value
    }

    public getTotalViews(): number {
        return this.total_views
    }
    public setTotalViews(value: number): void {
        this.total_views = value
    }
}
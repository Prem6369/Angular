export class ResortDetails {
  constructor(
    public resort_id: number,
    public name: string,
    public description: string,
    public location: string,
    public amenities: string[],
    public image_urls: string,
    public video_urls: string,
    public status: string,
    public created_date: string,
    public last_modified_date: string,
    public categories: any[],
    public coordinates: { lat: string, long: string }
  ) {}
}

export class Resort {
  constructor(
    public name: string,
    public description: string,
    public location: string,
    public amenities: string[],
    public image_urls: string,
    public video_urls: string,
    public status: string,
    public categories: any[],
    public coordinates: { lat: string, long: string }
  ) {}
}




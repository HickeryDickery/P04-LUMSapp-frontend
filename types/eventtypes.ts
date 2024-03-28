type Event = {
  title: string;
  postedBy: string;
  startTime: Date;
  endTime: Date;
  coordinates: number[];
  locationName: string;
  description: string;
  image: {
    public_id: string;
    url: string;
  };
  category: string;
};

export type { Event };

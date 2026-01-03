export interface Movie {
  id: number;
  title: string;
  dateOfPublish: string;
  genre: string;
  duration: string;
  userScore: number;
  images: {
    poster: string;
    backdrop: string;
  };
  overview: string;
  description: string;
  trailerYoutubeId?: string;

  actors: { firstName: string; lastName: string }[];
}

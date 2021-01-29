export class Song {
  constructor(
    private id: string,
    private category: string,
    private number: string,
    private title: string,
    private content: string,
    private access_count: string
  ){}

  getId() {return this.id};
  getCategory() {return this.category};
  getNumber() {return this.number};
  getTitle() {return this.title};
  getContent() {return this.content};
  getAccessCount() {return this.access_count};

  setId(id: string) { this.id = id };
  setCategory(category: string) { this.category = category };
  setNumber(number: string) { this.number = number };
  setTitle(title: string) { this.title = this.title };
  setContent(content: string) { this.content = this.content };
  setAccessCount(access_count: string) { this.access_count = this.access_count };

  static convertToUserModel(song: any): Song{
    return new Song(
      song.id,
      song.category,
      song.number,
      song.title,
      song.content,
      song.access_count
    );
  }
}

// export interface SongInputDTO {
//   category: string,
//   number: string,
//   title: string,
//   content: string,
// }

export interface SongOutputDTO{
  id: string;
  category: string,
  number: string,
  title: string,
  content: string
}

// export interface AllSongsOutputDTO{
//   id: string;
//   category: string,
//   number: string,
//   title: string
//   // content: string
// }
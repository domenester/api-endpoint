export interface IReportList {
  createdAt: Date;
  loginCount: number;
  timeLogged: any;
  audioCount: number;
  videoCount: number;
  conferenceCount: number;
  audioDuration: any;
  videoDuration: any;
  conferenceDuration: any;
}

export interface IReportFilter {
  users?: Array<string>;
  extension?: string;
  department?: string;
  start?: string;
  end?: string;
  grouping?: "day" | "hour";
}
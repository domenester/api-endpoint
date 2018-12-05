import * as moment from "moment";

export const postgreeDateFormat = (date: any) => {
  return moment(date).format("YYYY/MM/DD HH:MM:SS");
}

export const DATABASE_URI = () => {
  switch(process.env.NODE_ENV) {
    case "production":
      return process.env.DATABASE_URI_GENESIS;
    case "test-prod":
      return process.env.DATABASE_URI_GENESIS;
    default:
      return process.env.DATABASE_URI;
  }
}
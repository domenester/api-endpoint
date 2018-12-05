import * as sequelize from "sequelize";

export interface ITableHandler {
  sequelize: sequelize.Sequelize;
  model: sequelize.Model<string, {}>;
  initialize: (modelForeign?: sequelize.Model<string, {}> | Array<sequelize.Model<string, {}>>) => void;
  createMocks: () => Promise<string[]>;
  drop: () => any;
}
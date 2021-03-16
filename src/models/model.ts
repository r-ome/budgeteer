import Database from '../database/Database';

abstract class Model extends Database{
  abstract table: string;
  abstract primaryKey: string;

  abstract create(attributes: number): any;
}

export default Model;
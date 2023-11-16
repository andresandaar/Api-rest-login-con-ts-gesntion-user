
import { TObject, TProperties, Type } from '@sinclair/typebox';
import Ajv, { ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
//https://www.typescriptlang.org/docs/handbook/2/classes.html

 export default class SchemaValidator {
     private ajv: Ajv;
     protected validateSchema!: ValidateFunction;

     constructor() {
         this.ajv = new Ajv({ allErrors: true });
         addFormats(this.ajv, ['uuid', 'email'])
             .addKeyword('kind')
             .addKeyword('modifier');
         this.ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
         addErrors(this.ajv);
     }

     protected validateDTO(body: any, schema: TObject<{}>) {
         this.validateSchema = this.ajv.compile(schema);
         return this.validateSchema(body);
     }
 }

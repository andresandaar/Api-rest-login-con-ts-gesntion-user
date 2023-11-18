
import { TObject } from '@sinclair/typebox';
import Ajv, {ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
//https://www.typescriptlang.org/docs/handbook/2/classes.html

 export default class UserSchemaValidator {
     private validateSchema!: ValidateFunction;

     protected validSchemaErrors() {
         return this.validateSchema.errors?.map((error) => {
             return {
                 value: error.instancePath,
                 message: error.message,
             };
         });
     }
     
     protected validRegister(body: any, schema: TObject<{}>) {
         const ajv: Ajv = new Ajv({ allErrors: true });
         addFormats(ajv, ['uuid', 'email'])
             .addKeyword('kind')
             .addKeyword('modifier');
         ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
         addErrors(ajv);
         this.validateSchema = ajv.compile(schema);
         return this.validateSchema(body);
     }

     protected validLogin(body: any, schema: TObject<{}>) {
         const ajv: Ajv = new Ajv({ allErrors: true });
         addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
         ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
         addErrors(ajv);
         this.validateSchema = ajv.compile(schema);
         return this.validateSchema(body);
     }

     protected validEmailUpdata(body: any, schema: TObject<{}>) {
         const ajv: Ajv = new Ajv({ allErrors: true });
         addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
         ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
         addErrors(ajv);
         this.validateSchema = ajv.compile(schema);
         return this.validateSchema(body);
     }

     protected validPasswordUpdata(body: any, schema: TObject<{}>) {
         const ajv: Ajv = new Ajv({ allErrors: true });
         ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
         addErrors(ajv);
         this.validateSchema = ajv.compile(schema);
         return this.validateSchema(body);
     }

     protected validUserUpdate(body: any, schema: TObject<{}>) {
         const ajv: Ajv = new Ajv({ allErrors: true });
         addErrors(ajv);
         this.validateSchema = ajv.compile(schema);
         return this.validateSchema(body);
     }

     protected validUserUnregister(body: any, schema: TObject<{}>) {
           const ajv: Ajv = new Ajv({ allErrors: true });
           ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
           addErrors(ajv);
         this.validateSchema = ajv.compile(schema);
         return this.validateSchema(body);
     }
 }

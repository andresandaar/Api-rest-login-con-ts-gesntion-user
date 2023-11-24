/* 
import { TObject } from '@sinclair/typebox';
import Ajv, {ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import ajvKeywords from 'ajv-keywords';
//https://www.typescriptlang.org/docs/handbook/2/classes.html

 export default class UserSchemaValidator {
     private validateSchema!: ValidateFunction;

     protected validSchemaErrors() {
         return this.validateSchema.errors?.map((error) => {

             if (error.keyword && error.keyword === 'additionalProperties') {
                error.instancePath=`/${error.params.additionalProperty}`
                error.message = `La propiedad ${error.params.additionalProperty} no es valida`
             }
             if (error.keyword && error.keyword === 'required') {
               error.instancePath = `/${error.params.missingProperty}`;
               error.message = `La propiedad ${error.params.missingProperty} es requerida`;
             }
             return {
               param: error.instancePath,
               message: error.message
             };
         });
     }
     
     protected validRegister(body: any, schema: TObject<{}>) {
         const ajv: Ajv = new Ajv({ allErrors: true });
         ajvKeywords(ajv, 'transform');
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
         ajvKeywords(ajv, 'transform');
         addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
         ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
         addErrors(ajv);
         this.validateSchema = ajv.compile(schema);
         return this.validateSchema(body);
     }

     protected validEmailUpdata(body: any, schema: TObject<{}>) {
         const ajv: Ajv = new Ajv({ allErrors: true });
         ajvKeywords(ajv, 'transform');
         addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
         ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
         addErrors(ajv);
         this.validateSchema = ajv.compile(schema);
         return this.validateSchema(body);
     }

     protected validPasswordUpdata(body: any, schema: TObject<{}>) {
         const ajv: Ajv = new Ajv({ allErrors: true });
         ajvKeywords(ajv, 'transform');
         ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
         addErrors(ajv);
         this.validateSchema = ajv.compile(schema);
         return this.validateSchema(body);
     }

     protected validUserUpdate(body: any, schema: TObject<{}>) {
         const ajv: Ajv = new Ajv({ allErrors: true });
         ajvKeywords(ajv, 'transform');
         addErrors(ajv);
         this.validateSchema = ajv.compile(schema);
         return this.validateSchema(body);
     }

     protected validUserUnregister(body: any, schema: TObject<{}>) {
           const ajv: Ajv = new Ajv({ allErrors: true });
           ajvKeywords(ajv, 'transform');
           ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
           addErrors(ajv);
         this.validateSchema = ajv.compile(schema);
         return this.validateSchema(body);
     }
 }
 */
import { TObject } from '@sinclair/typebox';
import Ajv, { ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import ajvKeywords from 'ajv-keywords';

export default class UserSchemaValidator {
  private validateSchema!: ValidateFunction;

//Parametrosiniciales
  private initializeAjv(): Ajv {
    const ajv: Ajv = new Ajv({ allErrors: true });
    ajvKeywords(ajv, 'transform');
    addErrors(ajv);
    return ajv;
  }

  private validateWithSchema(
    body: any,
    schema: TObject<{}>,
    additionalConfigs?: (ajv: Ajv) => void
  ) {
    const ajv = this.initializeAjv();
    if (additionalConfigs) {
      additionalConfigs(ajv);
    }
    this.validateSchema = ajv.compile(schema);
    return this.validateSchema(body);
  }

  protected validSchemaErrors() {
    return this.validateSchema.errors?.map((error) => {
      if (error.keyword && error.keyword === 'additionalProperties') {
        error.instancePath = `/${error.params.additionalProperty}`;
        error.message = `La propiedad ${error.params.additionalProperty} no es valida`;
      }
      if (error.keyword && error.keyword === 'required') {
        error.instancePath = `/${error.params.missingProperty}`;
        error.message = `La propiedad ${error.params.missingProperty} es requerida`;
      }
      return {
        param: error.instancePath,
        message: error.message
      };
    });
  }

  protected validRegister(body: any, schema: TObject<{}>) {
    return this.validateWithSchema(body, schema, (ajv) => {
      addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
      ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
    });
  }

  protected validLogin(body: any, schema: TObject<{}>) {
    return this.validateWithSchema(body, schema, (ajv) => {
      addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
      ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
    });
  }

  protected validEmailUpdata(body: any, schema: TObject<{}>) {
    return this.validateWithSchema(body, schema, (ajv) => {
      addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
      ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
    });
  }

  protected validPasswordUpdata(body: any, schema: TObject<{}>) {
    return this.validateWithSchema(body, schema, (ajv) => {
      ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
    });
  }

  protected validUserUpdate(body: any, schema: TObject<{}>) {
    return this.validateWithSchema(body, schema);
  }

  protected validUserUnregister(body: any, schema: TObject<{}>) {
    return this.validateWithSchema(body, schema, (ajv) =>
      ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
    );
  }
  
}

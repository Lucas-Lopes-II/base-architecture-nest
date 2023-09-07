import { ClassValidatorFields } from '../../class-validator-fields';
import * as libClassValidator from 'class-validator';

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string;
}> {}

describe('ClassValidatorFields unit tests', () => {
  it('Should initialize erros and validatedData variables with null', () => {
    const stubClassValidatorFields = new StubClassValidatorFields();

    expect(stubClassValidatorFields.errors).toBeNull();
    expect(stubClassValidatorFields.validatedData).toBeNull();
  });

  it('Should validate with errors', () => {
    const spyValidateSync = jest
      .spyOn(libClassValidator, 'validateSync')
      .mockReturnValue([
        { property: 'field', constraints: { isRequired: 'test error' } },
      ]);
    const sut = new StubClassValidatorFields();

    expect(sut.validate(null)).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(sut.validatedData).toBeNull();
    expect(sut.errors).toStrictEqual({ field: ['test error'] });
  });

  it('Should validate without errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([]);
    const stubClass = new StubClassValidatorFields();

    expect(stubClass.validate({ field: 'value' })).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(stubClass.validatedData).toStrictEqual({ field: 'value' });
    expect(stubClass.errors).toBeNull();
  });
});

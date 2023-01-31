const { Temperaments } = require('../../src/db');
const { expect } = require("chai");


describe('Model Temperaments', () => {
  it('should have correct model name', () => {
    expect(Temperaments.getTableName()).to.equal('temperaments');
  });

  it('should have correct columns', () => {
    expect(Temperaments.rawAttributes).to.have.property('id');
    expect(Temperaments.rawAttributes.id.type.toSql()).to.equal('UUID');
    expect(Temperaments.rawAttributes).to.have.property('name');
    expect(Temperaments.rawAttributes.name.type.toSql()).to.equal('VARCHAR(255)');
  });

  it('should have not-null constraints on required fields', () => {
    expect(Temperaments.rawAttributes.id.allowNull).to.equal(false);
    expect(Temperaments.rawAttributes.name.allowNull).to.equal(false);
  });
});


import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper";

describe("property mapper", () => {
  it("deve converter PropertyEntity em Property corretamente", () => {
    const propertyEntity: PropertyEntity = {
      id: "1",
      name: "Test",
      description: "Test Desc",
      maxGuests: 5,
      basePricePerNight: 100,
      bookings: [],
    };
    const property = PropertyMapper.toDomain(propertyEntity);

    expect(property).toHaveProperty("id");
    expect(property.getId()).toBe(propertyEntity.id);
    expect(property).toHaveProperty("name");
    expect(property.getName()).toBe(propertyEntity.name);
    expect(property).toHaveProperty("description");
    expect(property.getDescription()).toBe(propertyEntity.description);
    expect(property).toHaveProperty("maxGuests");
    expect(property.getMaxGuests()).toBe(propertyEntity.maxGuests);
    expect(property).toHaveProperty("basePricePerNight");
    expect(property.getBasePricePerNight()).toBe(
      propertyEntity.basePricePerNight
    );
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
    const propertyEntity: any = {
      id: '1',
      name: "Test",
      description: "Test Desc",
      maxGuests: 5,
      bookings: [],
    };

    expect(() => PropertyMapper.toDomain(propertyEntity)).toThrow(
      "Campos obrigatórios não encontrados em PropertyEntity"
    );
  });

  it("deve converter Property para PropertyEntity corretamente", () => {
    const property = new Property("1", "Test", "Test Desc", 5, 200);

    const propertyEntity = PropertyMapper.toPersistence(property);

    expect(propertyEntity).toHaveProperty("id");
    expect(propertyEntity.id).toBe(property.getId());
    expect(propertyEntity).toHaveProperty("name");
    expect(propertyEntity.name).toBe(property.getName());
    expect(propertyEntity).toHaveProperty("description");
    expect(propertyEntity.description).toBe(property.getDescription());
    expect(propertyEntity).toHaveProperty("maxGuests");
    expect(propertyEntity.maxGuests).toBe(property.getMaxGuests());
    expect(propertyEntity).toHaveProperty("basePricePerNight");
    expect(propertyEntity.basePricePerNight).toBe(
      property.getBasePricePerNight()
    );
  });
});

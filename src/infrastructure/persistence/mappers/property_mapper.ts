import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";

export class PropertyMapper {
  static toDomain(entity: PropertyEntity): Property {
    if (
      !entity.id ||
      !entity.name ||
      !entity.description ||
      typeof entity.maxGuests !== "number" ||
      typeof entity.basePricePerNight !== "number"
    ) {
      throw new Error("Campos obrigatórios não encontrados em PropertyEntity");
    }

    return new Property(
      entity.id,
      entity.name,
      entity.description,
      entity.maxGuests,
      Number(entity.basePricePerNight)
    );
  }

  static toPersistence(domain: Property): PropertyEntity {
    if (
      !domain.getId() ||
      !domain.getName() ||
      !domain.getDescription() ||
      !domain.getMaxGuests() ||
      !domain.getBasePricePerNight()
    ) {
      throw new Error("Campos obrigatórios não encontrados em PropertyEntity");
    }

    const entity = new PropertyEntity();
    entity.id = domain.getId();
    entity.name = domain.getName();
    entity.description = domain.getDescription();
    entity.maxGuests = domain.getMaxGuests();
    entity.basePricePerNight = domain.getBasePricePerNight();
    return entity;
  }
}

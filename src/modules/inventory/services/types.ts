export interface InventoryMovementData {
  date: Date;
  ot_id: string;
  movementConceptId: string;
  movementTypeId: string;
  originWarehouseId: string;
  destinyWarehouseId: string;
  requisitionId: string;
  userId: string;
  user: IMUser;
  isDraft: boolean;
  isPublished: boolean;
  lotes: IMLote[];
  fromId: string;
  toId: string;
  folio: string;
  id: string;
}

export interface IMLote {
  id: string;
  quantity: number;
}

export interface IMUser {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  isDraft: boolean;
  isPublished: boolean;
  id: string;
  partidaId: number;
  username: string;
  name: string;
  departmentId: string;
  profileId: string;
  profile: IMProfile;
}

export interface IMProfile {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  isDraft: boolean;
  isPublished: boolean;
  id: string;
  partidaId: number;
  name: string;
  roles: string[];
}

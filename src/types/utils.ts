interface IId {
  id: number;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;
export type WithoutId<T extends IId> = Omit<T, 'id'>;
export type DeepPartialWithId<T extends IId> = DeepPartial<T> & Required<Pick<T, 'id'>>;
export type PartialWithId<T extends IId> = Partial<T> & Required<Pick<T, 'id'>>;
export type PartialWithoutId<T extends IId> = Partial<Omit<T, 'id'>>;

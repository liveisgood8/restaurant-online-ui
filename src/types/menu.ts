export interface IDishBaseInfo {
  name: string;
  description: string;
  protein: number | null;
  fat: number | null;
  carbohydrates: number | null;
}

export interface IDish extends IDishBaseInfo {
  id: number;
  imageUrl: string;
}

export interface IDishWithCategory extends IDish {
  category: {
    id: number;
  };
}

export interface ICategory {
  id: number;
  name: string;
}
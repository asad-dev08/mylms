"use client";

import { Category } from "@prisma/client";
import {
  FcCamera,
  FcEngineering,
  FcFilmReel,
  FcMindMap,
  FcMultipleDevices,
  FcMusic,
  FcSalesPerformance,
  FcSportsMode,
  FcVideoFile,
} from "react-icons/fc";
import { FaConnectdevelop, FaMicrosoft, FaThinkPeaks } from "react-icons/fa";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Photography: FcCamera,
  "Web Development": FcMindMap,
  "Video Editing": FcVideoFile,
  ".NET Core": FaMicrosoft,
  "Advanced Web Development": FaConnectdevelop,
  Music: FcMusic,
  Fitness: FcSportsMode,
  "Computer Science": FcMultipleDevices,
  Accounting: FcSalesPerformance,
  Filming: FcFilmReel,
  Engineering: FcEngineering,
  Autocad: FaThinkPeaks,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 flex-wrap gap-3">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

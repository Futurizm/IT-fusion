import { useState } from "react";
import { Layout } from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Clock } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  phone: string;
  address: string;
  workingHours: string;
  website: string;
  additionalInfo: string;
}

export const serviceItems: ServiceItem[] = [
  {
    id: "1",
    title: "Аварийная служба",
    description: "Круглосуточная помощь при авариях",
    phone: "112",
    address: "ул. Ленина, 23",
    workingHours: "24/7",
    website: "https://emergency.pavlodar.kz",
    additionalInfo: "Служба оказывает помощь при пожарах, наводнениях и других чрезвычайных ситуациях.",
  },
  {
    id: "2",
    title: "Скорая помощь",
    description: "Экстренная медицинская помощь",
    phone: "103",
    address: "пр. Назарбаева, 76",
    workingHours: "24/7",
    website: "https://ambulance.pavlodar.kz",
    additionalInfo: "Среднее время прибытия бригады - 15 минут. Служба оснащена современным оборудованием для оказания неотложной помощи.",
  },
  {
    id: "3",
    title: "Служба ЖКХ",
    description: "Решение коммунальных проблем",
    phone: "115",
    address: "ул. Сатпаева, 50",
    workingHours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
    website: "https://gkh.pavlodar.kz",
    additionalInfo: "Служба занимается вопросами водоснабжения, отопления, электроснабжения и благоустройства города.",
  },
];
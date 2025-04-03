import { FC } from 'react';
import { Button } from './button';
import { Card } from './card';

export type SidebarMenuItem = {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
};

interface SidebarMenuProps {
  items: SidebarMenuItem[];
  activeItem: string;
  onItemClick: (item: SidebarMenuItem) => void;
}

export const SidebarMenu: FC<SidebarMenuProps> = ({
  items,
  activeItem,
  onItemClick,
}) => {
  return (
    <Card className="w-[250px] h-full bg-white p-4">
      <div className="flex flex-col space-y-2">
        {items.map((item) => (
          <Button
            key={item.id}
            variant={activeItem === item.id ? "default" : "outline"}
            className={`justify-start ${
              activeItem === item.id
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            } ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => !item.disabled && onItemClick(item)}
            disabled={item.disabled}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}; 
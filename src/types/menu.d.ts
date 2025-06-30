declare module "@data/menu.json" {
  interface MenuItem {
    name: string;
    description?: string;
    price: number;
    image?: string;
  }

  interface MenuSection {
    category: string;
    items: MenuItem[];
  }

  const value: MenuSection[];
  export default value;
}

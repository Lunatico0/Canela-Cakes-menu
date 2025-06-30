import { useEffect, useState } from "react";

interface Props {
  categories: string[];
}

export default function CategoryNav({ categories }: Props) {
  const [selected, setSelected] = useState("");

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setSelected(id);
    }
  };

  // Scrollspy
  useEffect(() => {
    const onScroll = () => {
      let closestId = "";
      let closestOffset = Infinity;

      categories.forEach((cat) => {
        const id = slugify(cat);
        const section = document.getElementById(id);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - window.innerHeight / 2);

        if (distance < closestOffset) {
          closestOffset = distance;
          closestId = id;
        }
      });

      if (closestId && closestId !== selected) {
        setSelected(closestId);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [categories, selected]);

  return (
    <select
      value={selected}
      onChange={handleChange}
      className="bg-transparent ring-0 text-text
      focus-visible:outline-0 text-lg font-semibold"
    >
      {categories.map((cat) => (
        <option key={cat} value={slugify(cat)}>
          {cat}
        </option>
      ))}
    </select>
  );
}

import { useState } from "react";
import { dataItems } from "./dataPrdListMenu";

export default function PrdListMenu() {
  const [items, setItems] = useState(dataItems);

  const handleClick = (item) => {
    if (item.children) {
      setItems((prevItems) => {
        return prevItems.map((i) => {
          if (i.id === item.id) {
            return {
              ...i,
              children: i.children.map((c) => {
                c.open = !c.open;
                return c;
              }),
            };
          } else {
            return i;
          }
        });
      });
    }
  };

  return (
    <div className="col-span-3 bg-[#B21E02]">
      <ul>
        {items.map((item) => (
          <li key={item.id} onClick={handleClick.bind(null, item)}>
            {item.title}
            {item.children && (
              <ul>
                {item.children.map((child) => (
                  <li key={child.id}>
                    {child.title}
                    {child.open && (
                      <ul>
                        {child.children.map((grandChild) => (
                          <li key={grandChild.id}>{grandChild.title}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

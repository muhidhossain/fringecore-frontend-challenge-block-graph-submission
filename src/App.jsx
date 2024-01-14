import './index.css';
import { useEffect, useState } from 'react';

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [blocks, setBlocks] = useState([]);

  console.log(blocks);

  // pic a random position on the screen
  const randomPosition = () => {
    const randomWidth = Math.random() * window.innerWidth;
    const randomHeight = Math.random() * window.innerHeight;
    const x = randomWidth > 90 ? randomWidth - 90 : randomWidth + 90;
    const y = randomHeight > 70 ? randomHeight - 70 : randomHeight + 70;
    return { x, y };
  };

  useEffect(() => {
    setBlocks([
      { x: randomPosition().x, y: randomPosition().y, id: 0, childOf: '' },
    ]);
  }, []);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (e, id) => {
    if (isDragging) {
      setBlocks((prev) => {
        return prev.map((div) => {
          if (div.id === id) {
            return {
              x: div.x + e.movementX,
              y: div.y + e.movementY,
              id: div.id,
              childOf: div.childOf,
            };
          } else {
            return div;
          }
        });
      });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleAddDiv = (div) => {
    setBlocks((prev) => {
      return [
        ...prev,
        {
          x: randomPosition().x,
          y: randomPosition().y,
          id: prev.length,
          childOf: div.id,
        },
      ];
    });
  };

  return (
    <div onMouseUp={handleDragEnd} className="mainDiv">
      {blocks.map((block) => (
        <div
          key={block.id}
          style={{
            transform: `translate(${block.x}px, ${block.y}px)`,
          }}
          className="mainDiv__draggable"
          onMouseDown={handleDragStart}
          onMouseMove={(e) => handleDrag(e, block.id)}
          onMouseUp={handleDragEnd}
        >
          <span>{block.id}</span>
          <button onClick={() => handleAddDiv(block)}>+</button>
        </div>
      ))}
      {blocks.map((block, index) => {
        if (block.childOf !== '') {
          const findParent = blocks.find((b) => block.childOf === b.id);
          console.log(findParent);
          return (
            <svg key={index} className="mainDiv__line">
              <line
                x1={block.x + 90}
                y1={block.y + 70}
                x2={
                  Math.abs(findParent.y - block.y) > 200
                    ? block.x + 90
                    : findParent.x + 90
                }
                y2={
                  Math.abs(findParent.y - block.y) > 200
                    ? findParent.y + 70
                    : block.y + 70
                }
              />
              <line
                x1={
                  Math.abs(findParent.y - block.y) > 200
                    ? block.x + 90
                    : findParent.x + 90
                }
                y1={
                  Math.abs(findParent.y - block.y) > 200
                    ? findParent.y + 70
                    : block.y + 70
                }
                x2={findParent.x + 90}
                y2={findParent.y + 70}
              />
            </svg>
          );
        }
      })}
    </div>
  );
}

export default App;

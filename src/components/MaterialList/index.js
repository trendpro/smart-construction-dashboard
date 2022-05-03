import './index.css';

function ListItem({material, selectedMaterial, onSelectMaterial}) {
  return (
    <li className="list-item"
    style={{
        backgroundColor: selectedMaterial &&
        material.id === selectedMaterial.id ?
        '#000344' : ''
  }}
    onClick={() => onSelectMaterial(material)}
    >
      <div className="material-color"
        style={{backgroundColor: material.color}}
      >
      </div>
      <div className="material-details">
        <p className="material-name">{material.name}</p>
        <p className="material-quantity">{material.volume} m<sup>3</sup></p>
      </div>
    </li>
  );
}

function EmptyList() {
  return (
    <div className="empty-list">
      <p>No Materials</p>
    </div>
  );
}

function MaterialList({materials, selectedMaterial, onSelectMaterial}) {
  return (
    <div className="container">
      {materials.length > 0 ? (
        <ul className="list">
          {materials.map((material) => (
            <ListItem
              key={material.id}
              material={material}
              onSelectMaterial={onSelectMaterial}
              selectedMaterial={selectedMaterial}
            />
          ))}
        </ul>
      ) : (
          <EmptyList />
        )}
    </div>
  );
}

export default MaterialList;

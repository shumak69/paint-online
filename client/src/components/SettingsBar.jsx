import "../styles/settingBar.scss";
import toolState from "../store/toolState";
function SettingsBar() {
  return (
    <div className="setting-bar">
      <label htmlFor="line-width">Толщина линии</label>
      <input
        type="number"
        min={1}
        max={50}
        defaultValue={1}
        id="line-width"
        onChange={(e) => toolState.setLineWidth(e.target.value)}
      />
      <label htmlFor="stroke-color">Цвет обводки</label>
      <input type="color" id="stroke-color" onChange={(e) => toolState.setStrokeColor(e.target.value)} />
    </div>
  );
}

export default SettingsBar;

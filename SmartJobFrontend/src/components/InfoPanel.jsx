import "../styles/infopanel.css";

function InfoPanel({ textInfo, ulItems = [] }) {
  return (
    <div className="info-container">
      <div className="info-header">
        <p className="info-smartjob">SmartJob&nbsp;</p>
        <p className="info-tracker">tracker</p>
      </div>

      <div>
        <p className="info-text">{textInfo}</p>
      </div>

      <div>
        <ul className="info-ul">
          {ulItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InfoPanel;

var QRCode = require("qrcode.react");

function QRModal({ setShow, show, sessionId }) {
  return (
    <div
      style={show ? { display: "block" } : { display: "none" }}
      className="QRModal"
    >
      <div class="QRModal-content">
        <span onClick={() => setShow(!show)} class="modal-close">
          &times;
        </span>
        <h2>{`https://pivot-fe.netlify.app/${sessionId}`}</h2>
        <QRCode
          size={256}
          className="qr_code"
          value={`https://pivot-fe.netlify.app/${sessionId}`}
        />
      </div>
    </div>
  );
}

export default QRModal;

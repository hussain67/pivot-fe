var QRCode = require("qrcode.react");

function Modal({ setShow, show, sessionId }) {
  return (
    <div
      style={show ? { display: "block" } : { display: "none" }}
      className="Modal"
    >
      <div class="modal-content">
        <span onClick={() => setShow(!show)} class="modal-close">
          &times;
        </span>
        <p>{`https://pivot-fe.netlify.app/${sessionId}`}</p>
        <QRCode
          className="qr_code"
          value={`https://pivot-fe.netlify.app/${sessionId}`}
        />
      </div>
    </div>
  );
}

export default Modal;

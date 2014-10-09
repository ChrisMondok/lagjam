var peer;
function letsGetThisShowOnTheRoad() {
	document.body.className = "setup";

	peer = createPeer();

	setUpFormCrap();
}

function createPeer() {
	var peer = new Peer({key: "u9w2z80r7a5uerk9"});
	peer.on("open", function(id) {
		document.getElementById("id-display").value = id;
		new QRCode(document.getElementById("qrcode-container"), id);
	});
	return peer;
}

function makeMeTheServer() {
	document.body.className = "server";
}

function weGotAConnection(dataConnection) {

}

function setUpFormCrap() {
	document.getElementById("server-button").addEventListener("click", makeMeTheServer);

	var connectForm = document.getElementById("connect-form");

	connectForm.addEventListener("submit", function(submitEvent) {
		event.preventDefault();

		var peerId = connectForm.elements.namedItem("peer-id").value;
		connectToAPeer(peerId);

		return false;

	});

	document.getElementById("scan-code-button").addEventListener("click", function() {
		var scanWindow = window.open("scan");
		scanWindow.aQRCodeWasScannedAndWeGotThis = function(code) {
			connectForm.elements.namedItem("peer-id").value = code;
			scanWindow.close();
			connectForm.elements.namedItem("connect-button").click();
		};
	});
}

function connectToAPeer(id) {
	peer.connect(peerId);
}

window.addEventListener("load", letsGetThisShowOnTheRoad);

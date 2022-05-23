import { QRCodeSVG } from "qrcode.react";
import { useContext } from "react";
import { AuthContext } from "../pages/context/AuthContext";

const QR = () => {
    const {lnData} = useContext(AuthContext)
    return <div>
        <QRCodeSVG value={lnData.encoded.toLocaleUpperCase()} includeMargin size={256} />
    </div>
}

export default QR;
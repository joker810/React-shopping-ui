import { createPortal } from "react-dom";
import {useRef, useEffect} from 'react'


function Modal({isOpen, onClose, children}) {

    const modalRef=useRef(null);

    useEffect(()=>{
        const dialog= modalRef.current;
        if (isOpen && dialog) {
      dialog.showModal();
    } else if (!isOpen && dialog?.open) { //dialog?.open - dont close if dialog is null , already closed..
      dialog.close();
    }

    },[isOpen])
    return createPortal( 
        <dialog ref={modalRef} onClose={onClose}
        className="
        rounded-xl p-6
        backdrop:bg-black/50
        max-w-md w-full
        "
        >
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-xl font-bold"
            >
                ✕
            </button>
            {children}
        </dialog>
        ,document.getElementById('modal')
     );
}

export default Modal;
interface ModalProps {
    //eslint-disable-next-line
    closeFunction?: any;
    title?: string;
    children?: JSX.Element;
    buttons?: JSX.Element;
}

export default function Modal({ closeFunction, title, children, buttons }: ModalProps) {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" aria-modal="true">

            <div className="justify-center min-h-screen text-center block p-0">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeFunction}></div>

                <span className="inline-block align-middle h-screen" aria-hidden="true">&#8203;</span>

                <div className={"inline-block bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle"} aria-modal="true" aria-labelledby="modal-title">

                    <div className="bg-white px-3 py-3  ">
                        <div className="flex items-start">
                            <div className="text-left">

                                <h3 className="text-base leading-6 font-medium text-gray-900" id="modal-title">
                                    {title}
                                </h3>

                                <div className="mt-2">
                                    {children}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                    <div className="px-4 py-3  flex flex-row-reverse">
                        {buttons}
                    </div>
                </div>

            </div>

        </div>
    );
}

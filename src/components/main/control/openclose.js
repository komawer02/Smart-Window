function Openclosecomponent ({mode,state,onClickopen,onClickclose})  {
    return (
        <>
            {
                mode === 'on' ? null :
                    state === 'close' ? 
                        <div className="C-openclosebtn">
                            <button type="button" className="btn btn-outline-dark" onClick={()=>{onClickopen()}}>Open</button>
                            <button type="button" className="btn btn-secondary" disabled>Close</button>
                        </div> :
                        state === 'open' ?
                            <div className="C-openclosebtn">
                                <button type="button" className="btn btn-secondary" disabled>Open</button>
                                <button type="button" className="btn btn-outline-dark" onClick={()=>{onClickclose()}}>Close</button>
                            </div> :
                            <p>
                                수동 모드 에러
                            </p>
            }
        </>
    )
}

export default Openclosecomponent
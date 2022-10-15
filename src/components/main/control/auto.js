function AutoComponenet ({mode,onClickoff,onClickon}) {
    return (
        <div className="form-check form-switch mt-3">
            {
                mode === 'on' ?
                    <div className="C-openclosebtn">
                        <button type="button" className="btn btn-secondary" disabled>자동모드</button>
                        <button type="button" className="btn btn-outline-dark" onClick={()=>{onClickoff()}}>수동모드</button>
                    </div>
                    : mode === 'off' ?
                        <div className="C-openclosebtn">
                            <button type="button" className="btn btn-outline-dark" onClick={()=>{onClickon()}}>자동모드</button>
                            <button type="button" className="btn btn-secondary" disabled>수동모드</button>
                        </div>
                        : <div>mode 오류 : {mode}</div>
            }
        </div>
    )
}

export default AutoComponenet
function AutoComponenet({ mode, onClickoff, onClickon }) {
    return (
        <div className="C-autodiv mt-3">
            {/*             {
                mode === 'on' ?
            <div className="C-autobtn">
                <button type="button" className="C-disabled btn btn-primary" disabled>자동모드</button>
                <button type="button" className="C-apply btn btn-light btn-outline-light text-dark" onClick={() => { onClickoff() }}>수동모드</button>*/}
                {mode === 'on' ?
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked onChange={() => { onClickoff() }} />
                        <label>자동 모드</label>
                    </div>
                    :
                    <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={() => { onClickon() }} />
                    <label>자동 모드</label>
                    </div>
            }

            {/*</div>
                                 : mode === 'off' ?
                        <div className="C-openclosebtn">
                            <button type="button" className="C-apply btn btn-outline-dark" onClick={()=>{onClickon()}}>자동모드</button>
                            <button type="button" className="C-disabled btn btn-secondary" disabled>수동모드</button>
                        </div>
                        : <div>mode 오류 : {mode}</div>
            } */}
        </div>
    )
}

export default AutoComponenet
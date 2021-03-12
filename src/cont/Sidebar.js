import React, {useState} from "react";

export default (props) => {
    const [flag, setFlag] = useState([]);
    
    function handleClick(i) {
        // flag ? setFlag(false) : setFlag(true)
        const newFlag = flag;
        if(newFlag.indexOf(i) === -1) {
            newFlag.push(i);
        } else {
            newFlag.splice(newFlag.indexOf(i),1);
        }
        setFlag([...newFlag]);
        // console.log(flag);
    }
    return (
        <aside>
            <div>
                <h2>Мои лиги</h2>
                <hr/>
                <div className="nav-left">
                    <ul style={{borderBottomRightRadius: '3px'}}>
                        {
                            props.finish_result.map((strCountrie, index) => {
                                return(
                                    <li key={index}>
                                        <button key={index+'a'} className="dropdown-btn" onClick={() => handleClick(index)}>{strCountrie.league}
                                            {flag.indexOf(index) === -1
                                                ? 
                                                <i className={'zaa fa fa-caret-up'}></i>
                                                :
                                                <i className={'zaa fa fa-caret-down'}></i>
                                            }
                                        </button>
                                        <div key={index+'b'} className="dropdown-container" 
                                            style={
                                                flag.indexOf(index) === -1
                                                ?
                                                {display: 'block'}
                                                :
                                                {display: 'none'}
                                            }>
                                            {
                                                strCountrie.items.map((item, i) => {
                                                    return(
                                                        <a href="" key={i}>{item.item}<span className="closebtn">&times;</span></a>
                                                    )
                                                })
                                            }
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            
            <div>
                <h2>Страны</h2>
                <hr/>
                <div className="nav-left qqq">
                    <ul>
                        {
                            props.countryData.map((countrie, index) => {
                                return (<li key={index}>{countrie.country}</li>)
                            })
                        }
                    </ul>
                </div>
            </div>
        </aside>
    )
}